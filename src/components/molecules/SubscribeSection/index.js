import React from "react"
import { Box, Input, Button, Flex, Container } from "@theme-ui/components"

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
          "&>span": {
            whiteSpace: "nowrap",
          },
        }}
      >
        <span>Subscribe for updates.</span> <span>We won't spam you</span>
      </Box>
      <Flex
        variant="forms.ButtonInput"
        as="form"
        action="#"
        sx={{ maxWidth: "460px", mx: "auto" }}
      >
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
