const themeConfig = require('@dvcorg/gatsby-theme-iterative/tailwind.config')

module.exports = {
  ...themeConfig,
  corePlugins: {
    preflight: false
  },
  theme: {
    ...themeConfig.theme,
    fontFamily: {
      sans: ['DM Sans', 'Tahoma', 'Arial', 'sans-serif'],
      mono: [
        'SFMono-Regular',
        'Consolas',
        'Liberation Mono',
        'Menlo',
        'Courier',
        'monospace'
      ],
      brandon: ['BrandonGrotesque', 'Tahoma', 'Arial', 'sans-serif']
    }
  }
}
