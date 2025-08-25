import React, { useState, useEffect } from 'react'
import { Box, Input, Button, Flex } from '@theme-ui/components'

function SubscribeSection() {
  const [email, setEmail] = useState('')
  const [tags, setTags] = useState('3538617')
  const [honeypot, setHoneypot] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [successMessage])

  const handleSubmit = async e => {
    e.preventDefault()

    setSuccessMessage('')
    setErrorMessage('')

    if (honeypot) {
      return
    }

    if (!email) {
      setErrorMessage('Please enter a valid email address.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('EMAIL', email)
      formData.append('tags', tags)
      formData.append('b_7de8abe60497e4555ae20d817_b6c4b60e83', honeypot)

      await fetch(
        'https://datachain.us7.list-manage.com/subscribe/post?u=7de8abe60497e4555ae20d817&id=b6c4b60e83&f_id=00f09de0f0',
        {
          method: 'POST',
          body: formData,
          mode: 'no-cors'
        }
      )
      setSuccessMessage('Thank you for subscribing!')
      setEmail('')
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
        onSubmit={handleSubmit}
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        noValidate
      >
        <Input
          type="email"
          placeholder="E-mail"
          aria-label="E-mail"
          variant="forms.ButtonInput.Input"
          name="EMAIL"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <div hidden>
          <input
            type="hidden"
            name="tags"
            value={tags}
            onChange={e => setTags(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          variant="forms.ButtonInput.Button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </Button>
        <div
          style={{ position: 'absolute', left: '-5000px' }}
          aria-hidden="true"
        >
          <input
            type="text"
            name="b_7de8abe60497e4555ae20d817_b6c4b60e83"
            tabIndex={-1}
            value={honeypot}
            onChange={e => setHoneypot(e.target.value)}
          />
        </div>
      </Flex>
      {successMessage && (
        <Box
          sx={{
            color: '#4ade80',
            textAlign: 'center',
            mt: 3,
            fontSize: '14px',
            fontWeight: 500
          }}
        >
          {successMessage}
        </Box>
      )}
      {errorMessage && (
        <Box
          sx={{
            color: '#f87171',
            textAlign: 'center',
            mt: 3,
            fontSize: '14px',
            fontWeight: 500
          }}
        >
          {errorMessage}
        </Box>
      )}
    </Box>
  )
}

export default SubscribeSection
