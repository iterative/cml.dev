# Get Started with CML on Bitbucket

Here, we'll walk through a tutorial to start using CML with Bitbucket Pipelines.

1. Fork our
   [example project repository](https://bitbucket.org/iterative-ai/example-cml).

   ![](/img/bitbucket_fork_cml_project.png)

2. ⚠️ Follow
   [these instructions](https://cml.dev/doc/self-hosted-runners?tab=Bitbucket#personal-access-token)
   to configure a Bitbucket token for CML.

3. ⚠️ Follow [these instructions](https://cml.dev/doc/ref/comment#bitbucket) to
   enable the Pull Request Commit Links application.

<admon type="tip">

The following steps can all be done in the Bitbucket browser interface. However,
to follow along the commands, we recommend cloning your fork to your local
workstation:

```cli
$ git clone https://bitbucket.org/<your-username>/example-cml
```

</admon>

4. To create a CML workflow, copy the following into a new file named
   `bitbucket-pipelines.yml` on your `master` branch:

   ```yaml
   image: iterativeai/cml:0-dvc2-base1
   pipelines:
     default:
       - step:
           name: Train model
           script:
             - pip install -r requirements.txt
             - python train.py

             - cat metrics.txt >> report.md
             - echo '![](./plot.png)' >> report.md
             - cml comment create --publish report.md
   ```

5. In your text editor, open `train.py` and modify line 15 to `depth = 5`.

6. Commit and push the changes:

   ```cli
   $ git checkout -b experiment
   $ git add . && git commit -m "modify forest depth"
   $ git push origin experiment
   ```

7. In Bitbucket, create a Pull Request to compare the `experiment` branch to
   `master`.

   ![](/img/bitbucket_make_pr.png)

   <admon type="warn">

   Ensure the target is your fork (under your username).

   </admon>

   Shortly, you should see a comment appear in the Pull Request with your CML
   report. This is a result of the `cml comment create` command in your
   workflow.

   ![](/img/bitbucket_cml_first_report.png)

This is the gist of the CML workflow: when you push changes to your Bitbucket
repository, the workflow in your `bitbucket-pipelines.yml` file gets run and a
report generated.

CML commands let you display relevant results from the workflow, like model
performance metrics and visualizations, in Bitbucket checks and comments. What
kind of workflow you want to run, and want to put in your CML report, is up to
you.

## Final Solution

An example of what your repository should look like now can be found at
[`iterative-ai/cml-base-case`](https://bitbucket.org/iterative-ai/cml-base-case).
