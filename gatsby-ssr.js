import React from 'react'

import ModesProvider from './src/components/organisms/SwitchableMode/Provider'

export const wrapRootElement = ({ element }) => (
  <ModesProvider>{element}</ModesProvider>
)
