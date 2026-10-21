# Image Hosting for Reports

When a report links to local files, for example `![](./plot.png)`,
[`cml comment create`](/doc/ref/comment) uploads those files and replaces the
links with hosted URLs so the images render in your pull request.
[`cml asset publish`](/doc/ref/publish) does the same for a single file.

<admon type="warn">

**`asset.cml.dev` no longer accepts uploads.** CML used to upload report images
to this public server by default. Images published there before keep loading,
but new uploads fail. Reports that embed local images now need one of the
options below.

Runs that still upload to the default server fail with errors such as
`Invalid URL` or `Empty response from asset backend`.

</admon>

| Option                                                  | Works on                  | Setup                                      |
| ------------------------------------------------------- | ------------------------- | ------------------------------------------ |
| [Native uploads](#native-uploads)                       | GitLab, Bitbucket         | Add `--publish-native`                     |
| [Your own image server](#your-own-image-server)         | GitHub, GitLab, Bitbucket | Deploy once, then set a CI secret          |
| [Upload from your workflow](#upload-from-your-workflow) | GitHub, GitLab, Bitbucket | A bucket or CDN that serves files publicly |

If your reports don't need images, pass `--publish=false` and CML posts the
Markdown as is.

## Native uploads

GitLab and Bitbucket can store files for a project, so you don't need an image
server there. Add `--publish-native`:

```cli
$ cml comment create --publish-native report.md
```

On GitLab, images become [project uploads]; on Bitbucket, they are added to the
repository's **Downloads**. GitHub has no API for this, so the option isn't
available there.

[project uploads]: https://docs.gitlab.com/api/project_markdown_uploads/

## Your own image server

`--publish-url`, or the `CML_COMMENT_PUBLISH_URL` environment variable, points
CML at your own server instead of `asset.cml.dev`. Any server works if it:

1. Accepts a `POST` request whose body is the file, with the file type in the
   `Content-Type` header.
2. Stores the file and responds with its URL as plain text.
3. Serves that URL without authentication: images in comments are fetched by the
   viewer's browser or by GitHub's image proxy, not by your CI job.

CML adds `?cml=<type>&cache-bypass=<id>` to the returned URL, so the server
should ignore the query string when serving a file. CML can't send extra
headers, so any secret the server checks has to be part of the URL.

### Example: AWS Lambda and S3

This [CloudFormation] template creates a private S3 bucket and a Lambda function
with a public [function URL]. The function stores uploads in the bucket, names
each file after the SHA-256 hash of its contents, and serves the files back.
Only requests that include the upload token can add files.

[cloudformation]: https://docs.aws.amazon.com/cloudformation/
[function url]:
  https://docs.aws.amazon.com/lambda/latest/dg/urls-configuration.html

```yaml
# cml-image-server.yml
AWSTemplateFormatVersion: '2010-09-09'
Description: Image hosting for CML reports (cml comment create --publish-url)

Parameters:
  UploadToken:
    Type: String
    NoEcho: true
    MinLength: 32
    AllowedPattern: '[A-Za-z0-9]+'
    Description: Secret that CI jobs must include in the publish URL to upload

Resources:
  # Private bucket: images are served through the function URL below
  Bucket:
    Type: AWS::S3::Bucket
    Properties:
      PublicAccessBlockConfiguration:
        BlockPublicAcls: true
        BlockPublicPolicy: true
        IgnorePublicAcls: true
        RestrictPublicBuckets: true

  Role:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal: { Service: lambda.amazonaws.com }
            Action: sts:AssumeRole
      ManagedPolicyArns:
        - arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
      Policies:
        - PolicyName: images
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
              - Effect: Allow
                Action: [s3:GetObject, s3:PutObject]
                Resource: !Sub '${Bucket.Arn}/*'

  Function:
    Type: AWS::Lambda::Function
    Properties:
      Runtime: python3.13
      Handler: index.handler
      Role: !GetAtt Role.Arn
      MemorySize: 256
      Timeout: 30
      Environment:
        Variables:
          BUCKET: !Ref Bucket
          UPLOAD_TOKEN: !Ref UploadToken
      Code:
        ZipFile: |
          import base64, hashlib, hmac, os, re
          import boto3

          s3 = boto3.client("s3")
          BUCKET = os.environ["BUCKET"]
          TOKEN = os.environ["UPLOAD_TOKEN"].encode()


          def handler(event, context):
              method = event["requestContext"]["http"]["method"]
              if method == "POST":
                  return upload(event)
              if method == "GET":
                  return download(event)
              return {"statusCode": 405}


          def upload(event):
              # CML can't send custom headers, so the token is part of the URL
              token = (event.get("queryStringParameters") or {}).get("token", "")
              if not hmac.compare_digest(token.encode(), TOKEN):
                  return {"statusCode": 403}  # CML prints the status code
              body = event.get("body") or ""
              data = base64.b64decode(body) if event["isBase64Encoded"] else body.encode()
              if not data:
                  return {"statusCode": 400}
              key = hashlib.sha256(data).hexdigest()
              s3.put_object(
                  Bucket=BUCKET,
                  Key=key,
                  Body=data,
                  ContentType=event["headers"].get("content-type", "application/octet-stream"),
              )
              return {"statusCode": 200, "body": f"https://{event['requestContext']['domainName']}/{key}"}


          def download(event):
              key = event["rawPath"].lstrip("/")
              if not re.fullmatch(r"[0-9a-f]{64}", key):
                  return {"statusCode": 404}
              try:
                  obj = s3.get_object(Bucket=BUCKET, Key=key)
              except s3.exceptions.NoSuchKey:
                  return {"statusCode": 404}
              return {
                  "statusCode": 200,
                  "headers": {
                      "Content-Type": obj["ContentType"],
                      "Cache-Control": "public, max-age=31536000, immutable",
                  },
                  "body": base64.b64encode(obj["Body"].read()).decode(),
                  "isBase64Encoded": True,
              }

  FunctionUrl:
    Type: AWS::Lambda::Url
    Properties:
      TargetFunctionArn: !GetAtt Function.Arn
      AuthType: NONE

  # Public function URLs need both of these permissions
  InvokeUrlPermission:
    Type: AWS::Lambda::Permission
    Properties:
      FunctionName: !Ref Function
      Action: lambda:InvokeFunctionUrl
      Principal: '*'
      FunctionUrlAuthType: NONE

  InvokePermission:
    Type: AWS::Lambda::Permission
    Properties:
      FunctionName: !Ref Function
      Action: lambda:InvokeFunction
      Principal: '*'
      InvokedViaFunctionUrl: true

Outputs:
  FunctionUrl:
    Value: !GetAtt FunctionUrl.FunctionUrl
```

Deploy it with the [AWS CLI](https://aws.amazon.com/cli/), using credentials
that can create IAM roles, and print the publish URL:

```cli
$ TOKEN=$(openssl rand -hex 32)
$ aws cloudformation deploy \
    --template-file cml-image-server.yml \
    --stack-name cml-image-server \
    --capabilities CAPABILITY_IAM \
    --parameter-overrides UploadToken=$TOKEN
$ URL=$(aws cloudformation describe-stacks \
    --stack-name cml-image-server \
    --query "Stacks[0].Outputs[?OutputKey=='FunctionUrl'].OutputValue" \
    --output text)
$ echo "${URL}?token=${TOKEN}"
https://abcdefghijklmnopqrstuvwxyz012345.lambda-url.us-east-1.on.aws/?token=3f7a...
```

To check it, upload an image. The response is the image's URL, which you can
open in a browser:

```cli
$ curl --data-binary @plot.png -H 'Content-Type: image/png' "${URL}?token=${TOKEN}"
https://abcdefghijklmnopqrstuvwxyz012345.lambda-url.us-east-1.on.aws/9b1c...
```

Treat the full publish URL as a secret, since the token in it allows uploads.
Image URLs don't contain the token and are safe to share. Lambda function URLs
limit requests and responses to 6 MB, so this server handles files up to about 4
MB.

### Use it in your workflow

Store the publish URL, token included, as a secret named
`CML_COMMENT_PUBLISH_URL`. CML reads it from the environment, so your
`cml comment create` commands stay the same.

<toggle>
<tab title="GitHub">

Add a [repository secret], then expose it to the step that creates the report:

```yaml
- name: Create CML report
  env:
    REPO_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    CML_COMMENT_PUBLISH_URL: ${{ secrets.CML_COMMENT_PUBLISH_URL }}
  run: |
    echo '![](./plot.png "Confusion Matrix")' >> report.md
    cml comment create report.md
```

[repository secret]:
  https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions

</tab>
<tab title="GitLab">

Add a [CI/CD variable] named `CML_COMMENT_PUBLISH_URL`. Select **Masked** and
clear **Expand variable reference**; GitLab can't mask the URL's `?` character
otherwise. Your pipeline needs no changes.

[ci/cd variable]: https://docs.gitlab.com/ci/variables/

</tab>
<tab title="Bitbucket">

Add a secured [repository variable] named `CML_COMMENT_PUBLISH_URL`. Your
pipeline needs no changes.

[repository variable]:
  https://support.atlassian.com/bitbucket-cloud/docs/variables-and-secrets/

</tab>
</toggle>

`cml asset publish` reads its server from `CML_ASSET_URL` (or `--url`) instead.

## Upload from your workflow

If you already have storage that serves files publicly, such as a bucket with
public read access or a CDN, your workflow can upload images itself and link to
them. Pass `--publish=false` so CML posts the report without uploading anything:

```cli
$ aws s3 cp plot.png s3://my-public-bucket/reports/$GITHUB_SHA/plot.png
$ echo "![](https://my-public-bucket.s3.amazonaws.com/reports/$GITHUB_SHA/plot.png)" >> report.md
$ cml comment create --publish=false report.md
```
