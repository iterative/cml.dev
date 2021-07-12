const defaultPrefix = `site-mode-`

const makeModeId = (mode, prefix = defaultPrefix) => prefix + mode

export const modeStyle = (mode, styles, prefix = defaultPrefix) => ({
  [`#${makeModeId(mode, prefix)}:checked ~ * &`]: styles
})

export const applyModeObjectStyle = (styles, idPrefix = defaultPrefix) =>
  Object.entries(styles).reduce(
    (acc, [mode, styles]) => ({
      ...acc,
      ...modeStyle(mode, styles, idPrefix)
    }),
    {}
  )

const msx = ({ mode, modes, idPrefix, ...styles }) => {
  if (modes) {
    styles = {
      ...styles,
      ...applyModeObjectStyle(modes, idPrefix)
    }
  }
  if (mode) {
    styles = modeStyle(mode, styles, idPrefix)
  }
  return styles
}

export default msx
