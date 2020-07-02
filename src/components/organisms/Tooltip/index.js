import React from "react"
import { Box } from "@theme-ui/components"
import { alpha, mix } from "@theme-ui/color"
const types = require("./types.json")

const Tooltip = ({ sx = {}, className, type, children }) => {
  const { color, href, title = type } = types[type]
  return (
    <Box
      as={href ? "a" : "span"}
      aria-describedby={title}
      href={href}
      className={className}
      sx={{
        variant: "styles.Highlight",
        position: "relative",
        ">span": {
          backgroundColor: alpha(color, 0.2),
        },
        "&:hover>span": {
          color: mix("background", color, 0.3),
          backgroundColor: alpha(color, 0.3),
        },
        ":before": {
          variant: "styles.Tooltip.Bubble",
          content: `"${title}"`,
        },
        ":after": {
          variant: "styles.Tooltip.Arrow",
        },
        "&:hover:before, &:hover:after": {
          variant: "styles.Tooltip.Active",
        },
      }}
    >
      {children}
    </Box>
  )
}

export default Tooltip
