import React from "react"
import Tabs from "../index.js"
import coreStyles from "../core.module.css"

export default ({ styles = {}, ...props }) => (
  <Tabs
    styles={{
      ...coreStyles,
      ...styles,
    }}
    {...props}
  />
)
