import React from 'react'
import Tabs from '../index.js'
import * as coreStyles from '../core.module.css'

const TabsCore = ({ styles = {}, ...props }) => (
  <Tabs
    styles={{
      ...coreStyles,
      ...styles
    }}
    {...props}
  />
)

export default TabsCore
