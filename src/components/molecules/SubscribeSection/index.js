import React from 'react'
import { Box, Input, Button, Flex } from '@theme-ui/components'

function SubscribeSection() {
  return (
    <Box
      variant="styles.invert"
      sx={{
        px: 3,
        py: 5
      }}
    >
      <Box
        sx={{
          color: 'white',
          textAlign: 'center',
          fontWeight: '700',
          fontSize: ['28px', '32px'],
          mb: '40px',
          '&>span': {
            whiteSpace: 'nowrap'
          }
        }}
      >
        <span>Subscribe for updates.</span> <span>We won&apos;t spam you.</span>
      </Box>
      <Flex
        variant="forms.ButtonInput"
        as="form"
        sx={{ maxWidth: '460px', mx: 'auto' }}
        action="https://datachain.us7.list-manage.com/subscribe/post?u=7de8abe60497e4555ae20d817&amp;id=b6c4b60e83&amp;f_id=00f09de0f0"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        target="_blank"
        noValidate
      >
        <Input
          type="email"
          placeholder="E-mail"
          aria-label="E-mail"
          variant="forms.ButtonInput.Input"
          name="EMAIL"
        />
        <div hidden>
          <input type="hidden" name="tags" value="3538617" />
        </div>
        <Button variant="forms.ButtonInput.Button">Subscribe</Button>
        <div
          style={{ position: 'absolute', left: '-5000px' }}
          aria-hidden="true"
        >
          <input
            type="text"
            name="b_7de8abe60497e4555ae20d817_b6c4b60e83"
            tabIndex={-1}
          />
        </div>
      </Flex>
    </Box>
  )
}

export default SubscribeSection
