/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import socialImage from "media/social-image.png"

function SEO({ description, lang, meta, title }) {
  const {
    site: {
      siteMetadata: {
        title: siteTitle,
        description: siteDescription,
        author,
        siteUrl,
      },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  )

  const twitterHandle = "@DVCorg"
  const metaDescription = description || siteDescription

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${siteTitle}`}
      defaultTitle={siteTitle}
      meta={[
        // Generic metas
        {
          itemprop: "name",
          content: title,
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          itemprop: "image",
          content: socialImage,
        },

        // FB/OpenGraph
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: "og:url",
          content: siteUrl,
        },
        {
          property: "og:image",
          content: socialImage,
        },
        {
          property: "og:site_name",
          content: siteTitle,
        },

        // Twitter
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: "twitter:site",
          content: twitterHandle,
        },
        {
          name: `twitter:creator`,
          content: author,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: "twitter:image:src",
          content: socialImage,
        },
      ].concat(meta)}
    />
  )
}

;[]

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export default SEO
