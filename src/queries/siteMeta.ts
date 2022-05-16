import { useStaticQuery, graphql } from 'gatsby'

interface ISiteMeta {
  title: string
  description: string
  keywords: string
  siteUrl: string
}

export default function siteMeta(): ISiteMeta {
  const {
    site: { siteMetadata }
  } = useStaticQuery(
    graphql`
      query SEOSiteMetadata {
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

  return siteMetadata
}
