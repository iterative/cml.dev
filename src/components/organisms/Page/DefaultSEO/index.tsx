/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import relativeSocialImage from '@media/social-image.png'

interface ISEOProps {
  title?: string
  description?: string
  lang?: string
  meta?: HTMLMetaElement[]
}

const SEO: React.FC<ISEOProps> = ({
  description,
  title: pageTitle,
  lang,
  meta = []
}) => {
  const {
    site: {
      siteMetadata: { title: siteTitle, description: siteDescription, siteUrl }
    }
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `
  )

  const twitterHandle = '@DVCorg'
  const metaDescription = description || siteDescription
  const title = pageTitle || siteTitle
  const socialImage = siteUrl + relativeSocialImage
  const socialImageAlt =
    "The CML logo next to the word 'CML' with a purple background."

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={pageTitle}
      titleTemplate={`%s | ${siteTitle}`}
      defaultTitle={siteTitle}
      link={[
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#663399' }
      ]}
      meta={[
        // Generic metas
        {
          itemprop: 'name',
          content: title
        },
        {
          name: 'description',
          content: metaDescription
        },
        {
          itemprop: 'image',
          content: socialImage
        },
        {
          name: 'keywords',
          content: 'CI/CD,Continuous Integration,ML,Machine learning,DevOps'
        },

        // FB/OpenGraph
        {
          property: 'og:title',
          content: title
        },
        {
          property: 'og:description',
          content: metaDescription
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:url',
          content: siteUrl
        },
        {
          property: 'og:image',
          content: socialImage
        },
        {
          property: 'og:image:alt',
          content: socialImageAlt
        },
        {
          property: 'og:image:width',
          content: 1200
        },
        {
          property: 'og:image:height',
          content: 900
        },
        {
          property: 'og:image:type',
          content: 'image/png'
        },
        {
          property: 'og:site_name',
          content: siteTitle
        },
        {
          property: 'og:locale',
          content: 'en_US'
        },

        // Twitter
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          name: 'twitter:site',
          content: twitterHandle
        },
        {
          name: 'twitter:title',
          content: title
        },
        {
          name: 'twitter:description',
          content: metaDescription
        },
        {
          name: 'twitter:image',
          content: socialImage
        },
        {
          name: 'twitter:image:alt',
          content: socialImageAlt
        }
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  title: PropTypes.string
}

export default SEO
