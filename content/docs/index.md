# CML Documentation

[Continuous Machine Learning (CML)](/) is an open-source tool for implementing
continuous integration & delivery (CI/CD) in machine learning projects. Use it
to automate parts of your development workflow, including model training and
evaluation, comparing ML experiments across your project history, and monitoring
changing datasets.

<cards>

  <card href="/doc/start" heading="Get Started">
    Step-by-step introduction to basic CML features using our repository templates
  </card>

  <card href="/doc/usage" heading="Usage">
    Learn more about CML and setup your own repositories
  </card>

  <card href="/doc/cml-with-dvc" heading="CML with DVC">
    Bring data to your CML runner with DVC
  </card>

  <card href="/doc/self-hosted-runners" heading="Self-hosted Runners">
    Use your own (cloud or on-premise) runners with CML
  </card>

</cards>

✅ Please join our [community](https://dvc.org/community) or use the
[support](https://dvc.org/support) channels if you have any questions or need
specific help. We are very responsive ⚡.

✅ Check out our [GitHub repository](https://github.com/iterative/cml) and give
us a ⭐ if you like the project!

✅ Contribute to CML [on GitHub](https://github.com/iterative/cml) or help us
improve this [documentation](https://github.com/iterative/cml.dev) 🙏.

## CML principles

- **[GitFlow] for data science.** Use GitLab or GitHub to manage ML experiments,
  track who trained ML models, or modified data and when. Codify data and models
  with [DVC](/doc/cml-with-dvc) instead of pushing to a Git repo.

- **Auto reports for ML experiments.** Auto-generate reports with metrics and
  plots in each Git Pull Request. Rigorous engineering practices help your team
  make informed, data-driven decisions.

- **No additional services.** Build your own ML platform using just GitHub or
  GitLab and your [favorite cloud providers]: AWS, Azure, GCP, or Kubernetes. No
  databases, services or complex setup needed

[gitflow]: https://nvie.com/posts/a-successful-git-branching-model
[favorite cloud providers]:
  /doc/self-hosted-runners#cloud-compute-resource-credentials
