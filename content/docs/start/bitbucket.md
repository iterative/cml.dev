# Get Started with CML on Bitbucket

Here, we'll walk through a tutorial to start using CML. For simplicity, we'll
show the demo in Bitbucket Pipelines, but instructions are pretty similar for
all the supported CI systems.

1. Fork our
   [example project repository](https://bitbucket.org/iterative-ai/example-cml).

   ![](/img/bitbucket_fork_cml_project.png)

   The following steps can all be done in the Bitbucket browser interface.
   However, to follow along the commands, we recommend cloning your fork to your
   local workstation:

   ```bash
   git clone https://bitbucket.org/<your-username>/example-cml
   ```

2. To create a CML workflow, copy the following into a new file,
   `bitbucket-pipelines.yml`:

   ```yaml
   image: iterativeai/cml:0-dvc2-base1
   pipelines:
     default:
       - step:
           name: Train model
           script:
             - pip install -r requirements.txt
             - python train.py

             - cat metrics.txt > report.md
             - cml-publish plot.png --md >> report.md
             - cml-send-comment report.md
   ```

3. In your text editor of choice, edit line 15 of `train.py` to `depth = 12`.

4. Commit and push the changes:

   ```bash
   git checkout -b experiment
   git add . && git commit -m "modify forest depth"
   git push origin experiment
   ```

5. In Bitbucket, create a Pull Request to compare the `experiment` branch to
   `master`.

   ![](/img/bitbucket_make_pr.png)

   Shortly, you should see a comment from your user appear in the Pull Request
   with your CML report. This is a result of the `cml send-comment` command in
   your workflow.

   ![](/img/bitbucket_cml_first_report.png)

This is the gist of the CML workflow: when you push changes to your Bitbucket
repository, the workflow in your `bitbucket-pipelines.yml` file gets run and a
report generated.

CML commands let you display relevant results from the workflow, like model
performance metrics and vizualizations, in Bitbucket checks and comments. What
kind of workflow you want to run, and want to put in your CML report, is up to
you.

## Final Solution

An example of what your repository should look like now can be found at
[`iterative-ai/cml-base-case`](https://bitbucket.org/iterative-ai/cml-base-case).
