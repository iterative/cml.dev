import React from "react"
import { Flex } from "@theme-ui/components"

function Collapser({ children }) {
  ;<Flex
    sx={{
      flexFlow: ["column nowrap", "row nowrap"],
    }}
  >
    {children}
  </Flex>
}

export default Collapser
