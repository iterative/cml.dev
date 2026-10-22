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

The CML repository includes a server you can deploy to your AWS account:
[`image-server`](https://github.com/iterative/cml/tree/main/image-server). Its
[CloudFormation] template creates a private S3 bucket and a Lambda function with
a public [function URL]. The function stores uploads in the bucket, names each
file after the SHA-256 hash of its contents, and serves the files back. Only
requests that include the upload token can add files.

[cloudformation]: https://docs.aws.amazon.com/cloudformation/
[function url]:
  https://docs.aws.amazon.com/lambda/latest/dg/urls-configuration.html

Deploy it with the [AWS CLI](https://aws.amazon.com/cli/), using credentials
that can create IAM roles, and print the publish URL:

```cli
$ curl -O https://raw.githubusercontent.com/iterative/cml/main/image-server/template.yml
$ TOKEN=$(openssl rand -hex 32)
$ aws cloudformation deploy \
    --template-file template.yml \
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
Image URLs don't contain the token and are safe to share. The
[README](https://github.com/iterative/cml/tree/main/image-server#operate) covers
token rotation, size limits, costs, and removing the server.

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
