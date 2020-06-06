import React from "react"
import { Box, Input, Button, Flex } from "@theme-ui/components"

function SubscribeSection() {
  return (
    <Box
      variant="styles.invert"
      sx={{
        px: 3,
        py: 5,
      }}
    >
      <Box
        sx={{
          color: "white",
          textAlign: "center",
          fontWeight: "700",
          fontSize: 4,
          mb: [4, 5],
        }}
      >
        <div>Subscribe for updates.</div>
        <div>We won't spam you</div>
      </Box>
      <Flex variant="forms.ButtonInput" as="form" action="#">
        <Input
          type="email"
          placeholder="E-mail"
          variant="forms.ButtonInput.Input"
          name="email"
        />
        <Button variant="forms.ButtonInput.Button">Subscribe</Button>
      </Flex>
    </Box>
  )
}

export default SubscribeSection
