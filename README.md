# CML website

This repo hosts the Gatsby-based website for
[CML](https://github.com/iterative/cml).

It's primarily a marketing website with some light docs, but the primary docs
are in the GitHub README.

## Running this site locally

Start by cloning this repo:

Get the full history with

```bash
git clone https://github.com/iterative/cml.dev
```

Alternatively, you can save some space with a shallow clone:

```bash
git clone --depth 1 https://github.com/iterative/cml.dev
```

From here, go into the cloned directory and install packages

```bash
cd cml.dev
yarn
```

With the setup finished, you can now spin up the development server at
`localhost:8000` with `gatsby develop` or try a full local build at
`localhost:9000` with `gatsby build && gatsby serve`.
