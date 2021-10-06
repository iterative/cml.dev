# Installing CML as a Package

CML comes pre-installed in our provided
[Docker Images](/doc/self-hosted-runners#docker-images). Alternatively, GitHub
users can also use the [`setup-cml` action](/doc/start/github#setup-action).

However, in all other cases, CML can be installed directly as a Node.js package
using the package manager `npm` ([see below](#installing-nodejs)):

```bash
npm i -g @dvcorg/cml
```

You may also need to install additional dependencies to use
[DVC plots](https://dvc.org/doc/command-reference/plots) and Vega-Lite:

```bash
sudo apt-get install -y \
  libcairo2-dev libfontconfig-dev \
  libgif-dev libjpeg-dev libpango1.0-dev librsvg2-dev
npm install -g vega-cli vega-lite
```

## Installing Node.js

Instructions for installing [Node.js](https://nodejs.org) and its package
manager `npm` can be found below.

<toggle>
<tab title="GitLab">

Install Node.js from source:

```bash
curl -sL https://deb.nodesource.com/setup_14.x | bash
apt-get update
apt-get install -y nodejs
```

</tab>
<tab title="GitHub">

Node.js is likely already available in most GitHub Actions runners. However, to
install a particular version, add the following step to your workflow:

```bash
- uses: actions/setup-node@v1
  with:
    node-version: '14'
```

</tab>
</toggle>
