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
          fontSize: "32px",
          mb: "40px",
          "&>span": {
            whiteSpace: "nowrap",
          },
        }}
      >
        <span>Subscribe for updates.</span> <span>We won&apos;t spam you</span>
      </Box>
      <Flex
        variant="forms.ButtonInput"
        as="form"
        sx={{ maxWidth: "460px", mx: "auto" }}
        action="https://dvc.us10.list-manage.com/subscribe/post?u=a08bf93caae4063c4e6a351f6&amp;id=fe11690c19"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        target="_blank"
        novalidate
      >
        <Input
          type="email"
          placeholder="E-mail"
          aria-label="E-mail"
          variant="forms.ButtonInput.Input"
          name="EMAIL"
        />
        <Button variant="forms.ButtonInput.Button">Subscribe</Button>
        <div
          style={{ position: "absolute", left: "-5000px" }}
          aria-hidden="true"
        >
          <input
            type="text"
            name="b_a08bf93caae4063c4e6a351f6_fe11690c19"
            tabIndex="-1"
            value=""
          />
        </div>
      </Flex>
    </Box>
  )
}

export default SubscribeSection
