import React, { useState, useEffect } from "react"
import { defaultModes } from "../common"

export const ModeContext = React.createContext(undefined)

const isRuntime = typeof window !== "undefined"

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
  const setModeToValue = e => {
    setModeState(e.target.value)
  }
  // Save to localStorage whenever state changes
  useEffect(() => saveMode(name, currentMode), [name, currentMode])
  return {
    currentMode,
    setModeState,
    setModeToValue,
  }
}

const ModeSwitchRadios = ({ name, idPrefix, modes, currentMode, onChange }) => {
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
          onChange={onChange}
          aria-hidden={true}
          aria-label="Hidden mode switch radio"
          hidden
        />
      ))}
    </>
  )
}

const ModeProvider = ({
  name = "site-mode-switcher-mode",
  idPrefix = "site-mode-",
  modes = defaultModes,
  defaultMode = "gitlab",
  children,
}) => {
  const { currentMode, setModeToValue } = usePersistentMode(name, defaultMode)
  return (
    <ModeContext.Provider value={currentMode}>
      <ModeSwitchRadios
        name={name}
        modes={modes}
        idPrefix={idPrefix}
        defaultMode={defaultMode}
        currentMode={currentMode}
        onChange={setModeToValue}
      />
      {children}
    </ModeContext.Provider>
  )
}

export const modes = defaultModes
export default ModeProvider
