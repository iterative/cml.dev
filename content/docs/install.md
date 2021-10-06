# Install CML

CML comes pre-installed in our provided
[Docker Images](/doc/self-hosted-runners#docker-images). Alternatively, GitHub
users can also use the [`setup-cml` action](/doc/start/github#setup-action).

However, in all other cases, CML can be installed directly as a
[NodeJS](https://nodejs.org) package (using the package manager `npm`):

```bash
npm i -g @dvcorg/cml
```

You may need to install additional dependencies to use
[DVC plots](https://dvc.org/doc/command-reference/plots) and Vega-Lite CLI
commands:

```bash
sudo apt-get install -y libcairo2-dev libpango1.0-dev libjpeg-dev \
          libgif-dev librsvg2-dev libfontconfig-dev
npm install -g vega-cli vega-lite
```

## Installing NodeJS

<toggle>
<tab title="GitLab">

Install NodeJS from source:

```bash
curl -sL https://deb.nodesource.com/setup_14.x | bash
apt-get update
apt-get install -y nodejs
```

</tab>
<tab title="GitHub">

NodeJS is likely already available in most GitHub Actions runners. However, to
install a particular version, add the following step to your workflow:

```bash
- uses: actions/setup-node@v1
  with:
    node-version: '14'
```

</tab>
</toggle>
