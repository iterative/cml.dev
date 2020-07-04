const path = require(`path`)
require(`dotenv`).config()

module.exports = {
  siteMetadata: {
    title: `CML - CI for Machine Learning`,
    description: `CML is continuous integration for machine learning. Bring DevOps to data science.`,
    author: `Iterative`,
    siteUrl: process.env.URL || "https://cml.dev",
  },
  plugins: [
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
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: [`DM Sans`, `DM Mono`],
        },
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
        path: path.resolve(`./src/images`),
        name: `images`,
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [require.resolve(`./remarkPlugin.js`)],
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
        icon: `src/images/site-icon.png`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-netlify`,
  ],
}
