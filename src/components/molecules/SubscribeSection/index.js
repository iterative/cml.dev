import React from "react"
import { Box, Input, Button, Flex } from "@theme-ui/components"

function SubscribeSection() {
  return (
    <Box>
      <Box
        sx={{
          color: "white",
          textAlign: "center",
          fontWeight: "700",
          fontSize: 4,
          my: [4, 5],
        }}
      >
        <div>Subscribe for updates.</div>
        <div>We won't spam you</div>
      </Box>
      <Flex variant="styles.buttonInput">
        <Input type="text" placeholder="E-mail" variant="partial" />
        <Button variant="subscribe">Subscribe</Button>
      </Flex>
    </Box>
  )
}

export default SubscribeSection
