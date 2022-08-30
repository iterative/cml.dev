# Get Started with CML on GitLab

Here, we'll walk through a tutorial to start using CML. For simplicity, we'll
show the demo in GitLab CI/CD, but instructions are pretty similar for all the
supported CI systems.

1. Fork our
   [example project repository](https://gitlab.com/iterative.ai/example_cml).

   ![](/img/gitlab_fork_cml_project.png)

2. ⚠️ Follow
   [these instructions](https://cml.dev/doc/self-hosted-runners?tab=GitLab#personal-access-token)
   to configure a GitLab access token for CML.

<admon type="tip">

The following steps can all be done in the GitLab browser interface. However, to
follow along the commands, we recommend cloning your fork to your local
workstation:

```cli
$ git clone https://gitlab.com/<your-username>/example_cml
$ cd example_cml
```

![](/img/gitlab_cml_clone.png)

</admon>

3. To create a CML workflow, copy the following into a new file named
   `.gitlab-ci.yml`:

   ```yaml
   train-and-report:
     image: iterativeai/cml:0-dvc2-base1
     script:
       - pip install -r requirements.txt
       - python train.py

       - cat metrics.txt >> report.md
       - cml publish plot.png --md >> report.md
       - cml send-comment report.md
   ```

4. In your text editor, open `train.py` and modify line 15 to `depth = 5`.

5. Commit and push the changes:

   ```cli
   $ git checkout -b experiment
   $ git add . && git commit -m "modify forest depth"
   $ git push origin experiment
   ```

6. In GitLab, create a Merge Request to compare the `experiment` branch to
   `master`.

   ![](/img/create_merge_request.png)

   The "New Merge Request" page will let you **Change branches**:

   ![](/img/new_merge_request.png)

   <admon type="warn">

   Ensure the target is your fork (under your username):

   ![](/img/change_user_name.png)

   </admon>

   Continue and submit the Merge Request. Shortly, you should see a comment
   appear in the Merge Request with your CML report. This is a result of the
   `cml send-comment` command in your workflow.

   ![](/img/cml_start_gitlab_end.png)

This is the gist of the CML workflow: when you push changes to your GitLab
repository, the workflow in your `.gitlab-ci.yml` file gets run and a report
generated.

CML commands let you display relevant results from the workflow, like model
performance metrics and vizualizations, in GitLab comments. What kind of
workflow you want to run, and want to put in your CML report, is up to you.

## Final Solution

An example of what your repository should look like now can be found at
[iterative.ai/cml-base-case](https://gitlab.com/iterative.ai/cml-base-case).
