import React, { useState, useEffect, useContext } from 'react'
import { defaultModes } from '../common'

export const ModeContext = React.createContext({
  currentMode: 'gitlab',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateMode: () => {}
})

const isRuntime = typeof window !== 'undefined'

const buildModeItemId = name => `mode-switcher-${name}`

const saveMode = (name, setting) => {
  try {
    return isRuntime
      ? window.localStorage.setItem(buildModeItemId(name), setting)
      : null
  } catch (e) {
    console.error(e)
    return null
  }
}

const loadMode = name => {
  try {
    return isRuntime ? window.localStorage.getItem(buildModeItemId(name)) : null
  } catch (e) {
    console.error(e)
    return null
  }
}

const usePersistentMode = (name, fallbackDefault) => {
  const savedMode = loadMode(name)
  const [currentMode, setModeState] = useState(
    savedMode !== null ? savedMode : fallbackDefault
  )
  const updateMode = mode => {
    setModeState(mode)
  }
  // Save to localStorage whenever state changes
  useEffect(() => saveMode(name, currentMode), [name, currentMode])
  return {
    currentMode,
    setModeState,
    updateMode
  }
}

const ModeSwitchRadios = ({ name, idPrefix, modes, currentMode }) => {
  return (
    <>
      {modes.map((mode, i) => (
        <input
          key={i}
          type="radio"
          id={idPrefix + mode}
          name={name}
          value={mode}
          checked={currentMode === mode}
          readOnly
          aria-hidden={true}
          aria-label="Hidden mode switch radio"
          hidden
        />
      ))}
    </>
  )
}

const ModesProvider = ({
  name = 'site-mode-switcher-mode',
  idPrefix = 'site-mode-',
  modes = defaultModes,
  defaultMode = 'gitlab',
  children
}) => {
  const { currentMode, updateMode } = usePersistentMode(name, defaultMode)
  return (
    <ModeContext.Provider value={{ currentMode, updateMode }}>
      <ModeSwitchRadios
        name={name}
        modes={modes}
        idPrefix={idPrefix}
        defaultMode={defaultMode}
        currentMode={currentMode}
      />
      {children}
    </ModeContext.Provider>
  )
}

export const useMode = () => {
  const { currentMode, updateMode } = useContext(ModeContext)
  return {
    currentMode,
    updateMode
  }
}

export const modes = defaultModes
export default ModesProvider
