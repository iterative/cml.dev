import React from "react"
import PropTypes from "prop-types"
import SubscribeSection from "components/molecules/SubscribeSection"
import BaseLayout from "templates/Base"

import Header from "./Header"

import { Container } from "@theme-ui/components"

export const groupApply = (rawChildren, test, cb) => {
  const currentGroup = []
  const result = []

  const children = Array.isArray(rawChildren) ? rawChildren : [rawChildren]

  for (const child of children) {
    if (test(child) === true) {
      currentGroup.push(child)
    } else {
      if (currentGroup.length > 0) {
        /*
           If the current child doesn't pass the test and there is currently a
           group of passing items, add the result of the callback applied on
           a copy of that group, then clear the group.
         */
        result.push(cb(currentGroup.slice(), result.length))
        currentGroup.length = 0
      }
      // Add the non-passing child directly to the result, ungrouped.
      result.push(child)
    }
  }

  // Process the last group if the last child passed.
  if (currentGroup.length > 0) {
    result.push(cb(currentGroup, result.length))
  }

  return result
}

const ContainExcept = ({
  container = Container,
  fullWidthComponents = ["FullWidthBox"],
  children,
}) => {
  const processedChildren = groupApply(
    children,
    child => !fullWidthComponents.includes(child.props.mdxType),
    (group, i) => <Container key={`wrapped-container-${i}`}>{group}</Container>
  )
  return <>{processedChildren}</>
}

const Layout = ({ children }) => {
  return (
    <BaseLayout>
      <Header />
      <main id="main">
        <ContainExcept>{children}</ContainExcept>
      </main>
      <SubscribeSection />
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </BaseLayout>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
