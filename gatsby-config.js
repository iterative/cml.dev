const path = require(`path`)
require(`dotenv`).config()

module.exports = {
  siteMetadata: {
    title: `CML - Continuous Machine Learning: Bring DevOps to Data Science`,
    description: `CML is continuous integration for machine learning.  Bring DevOps practices to your projects for automatic, reproducible, and fast machine learning.`,
    author: `Iterative`,
    siteUrl: process.env.URL || "https://cml.dev",
  },
  plugins: [
    `gatsby-plugin-preact`,
    `gatsby-plugin-eslint`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-120072346-5`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.resolve(`./content`),
        name: `content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.resolve(`./src/media`),
        name: `images`,
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
    },
    `gatsby-remark-images`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        plugins: ["gatsby-remark-images"],
        gatsbyRemarkPlugins: [
          require.resolve(`./remarkPlugin.js`),
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              withWebp: true,
              loading: "lazy",
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `CML`,
        short_name: `CML`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/media/site-icon.png`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-robots-txt`,
    {
      resolve: `gatsby-plugin-purge-cloudflare-cache`,
      options: {
        condition: process.env.CONTEXT === "production",
        token: process.env.CLOUDFLARE_TOKEN,
        zoneId: process.env.CLOUDFLARE_ZONE,
      },
    },
    `gatsby-plugin-sitemap`,
  ],
}
