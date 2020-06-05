import React from "react"
import { Heading, Box } from "@theme-ui/components"

export default {
  title: "Heading",
  parameters: {
    component: Heading,
    componentSubtitle: "The theme-ui component for Headings",
  },
}

export const usage = () => (
  <Box
    sx={{
      p: 2,
    }}
  >
    <Heading>Default (h2)</Heading>
    <Heading as="h1">h1</Heading>
    <Heading as="h2">h2</Heading>
    <Heading as="h3">h3</Heading>
    <Heading as="h4">h4</Heading>
    <Heading as="h5">h5</Heading>
    <Heading as="h6">h6</Heading>
  </Box>
)
