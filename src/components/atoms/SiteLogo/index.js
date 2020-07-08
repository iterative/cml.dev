import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

function SiteLogo({ ...props }) {
  const {
    file: {
      childImageSharp: { fluid: fluidImage },
    },
  } = useStaticQuery(graphql`
    query SiteLogoQuery {
      file(
        sourceInstanceName: { eq: "images" }
        relativePath: { eq: "logo.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 154) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  return <Image fluid={fluidImage} alt="CML" {...props} />
}

export default SiteLogo
