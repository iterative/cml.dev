/* eslint-env node */

require('dotenv').config()
const path = require('path')

require('./config/prismjs/dvc')
require('./config/prismjs/usage')

const apiMiddleware = require('./src/server/middleware/api')
const redirectsMiddleware = require('./src/server/middleware/redirects')

const title = 'CML - Continuous Machine Learning: Bring DevOps to Data Science'
const description =
  'CML is continuous integration for machine learning.  Bring DevOps practices to your projects for automatic, reproducible, and fast machine learning.'

const plugins = [
  {
    resolve: `gatsby-plugin-typescript`,
    options: {
      isTSX: true,
      allExtensions: true
    }
  },
  {
    resolve: `gatsby-plugin-alias-imports`,
    options: {
      alias: {
        '@media': 'src/media'
      }
    }
  },
  'gatsby-plugin-postcss',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-sitemap',
  'gatsby-plugin-twitter',
  `gatsby-plugin-theme-ui`,
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'content',
      path: path.join(__dirname, 'content')
    }
  },
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        'gatsby-remark-embedder',
        'gatsby-remark-dvc-linker',
        {
          resolve: 'gatsby-remark-prismjs',
          options: {
            noInlineHighlight: true,
            languageExtensions: [
              {
                language: 'text',
                definition: {}
              }
            ]
          }
        },
        {
          resolve: 'gatsby-remark-smartypants',
          options: {
            quotes: false
          }
        },
        `gatsby-plugin-sass`,
        `gatsby-plugin-robots-txt`,
        {
          resolve: 'gatsby-remark-embed-gist',
          options: {
            includeDefaultCss: true
          }
        },
        'gatsby-remark-relative-images',
        'gatsby-remark-copy-linked-files',
        'gatsby-remark-external-links',
        {
          resolve: 'gatsby-remark-autolink-headers',
          options: {
            enableCustomId: true,
            isIconAfterHeader: true
          }
        },
        {
          resolve: 'gatsby-remark-images',
          options: {
            withWebp: true
          }
        },
        'gatsby-remark-responsive-iframe',
        'resize-image-plugin',
        'external-link-plugin'
      ]
    }
  },
  {
    resolve: 'gatsby-plugin-svgr',
    options: {
      ref: true,
      svgoConfig: {
        plugins: [{ removeViewBox: false }]
      }
    }
  },
  'gatsby-plugin-sharp',
  'gatsby-transformer-sharp',
  'gatsby-plugin-catch-links',
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      /* eslint-disable @typescript-eslint/camelcase */
      background_color: '#663399',
      display: 'minimal-ui',
      icon: 'static/favicon-512x512.png',
      name: 'CML',
      short_name: 'CML',
      start_url: '/',
      theme_color: '#663399'
      /* eslint-enable @typescript-eslint/camelcase */
    }
  },
  {
    resolve: 'gatsby-plugin-sentry',
    options: {
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      release: process.env.SOURCE_VERSION,
      enabled: process.env.NODE_ENV === 'production',
      ignoreErrors: [
        /* When we deploy new version we delete assets which were generated for
        the previous deployed version, but users can have opened old version in 
        their browsers. If they hover some link on the page Gatsby.js will try
        fetch old chunks and will get ChunkLoadError, but then will load static
        page from the new deployed version and all will be ok. So we can just
        ignore these type of errors */
        'ChunkLoadError'
      ],
      /* There are some common urls which recomment to ignore. It's even 
      mentioned in the official documentation: https://docs.sentry.io/platforms/javascript/#decluttering-sentry
      In our case we just ignore all errors from the browser's extensions,
      because we can't influence on then somehow. */
      blacklistUrls: [/extensions\//i, /^chrome:\/\//i]
    }
  }
]

if (process.env.GITHUB_TOKEN) {
  plugins.push({
    resolve: `gatsby-source-github-api`,
    options: {
      // token: required by the GitHub API
      token: process.env.GITHUB_TOKEN,

      // GraphQLquery: defaults to a search query
      graphQLQuery: `
          {
            repository(owner: "iterative", name: "cml") {
              stargazers {
                totalCount
              }
            }
          }
        `,
      variables: {}
    }
  })
}

if (process.env.CONTEXT === 'production') {
  plugins.push({
    resolve: 'gatsby-plugin-google-analytics',
    options: {
      respectDNT: true,
      trackingId: process.env.GA_ID
    }
  })
}

if (process.env.ANALYZE) {
  plugins.push({
    resolve: 'gatsby-plugin-webpack-bundle-analyzer',
    options: {
      analyzerPort: 4000,
      production: process.env.NODE_ENV === 'production'
    }
  })
}

module.exports = {
  plugins,
  siteMetadata: {
    description,
    author: `Iterative`,
    siteUrl: process.env.URL || 'https://cml.dev',
    title
  },
  developMiddleware: app => {
    app.use(redirectsMiddleware)
    app.use('/api', apiMiddleware)
  }
}
