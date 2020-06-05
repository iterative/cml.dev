const path = require("path")

module.exports = {
  stories: ["../**/*.stories.js"],
  addons: ["@storybook/addon-docs", "@storybook/addon-actions"],
  webpackFinal: async config => {
    config.resolve.modules.unshift(path.resolve("src"))

    config.module.rules.push({
      // Config for js and jsx files
      test: /\.(js|jsx)$/,
      use: [
        {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [
              // use @babel/preset-react for JSX and env (instead of staged presets)
              require.resolve("@babel/preset-react"),
              require.resolve("@babel/preset-env"),
            ],
            plugins: [
              // use @babel/plugin-proposal-class-properties for class arrow functions
              require.resolve("@babel/plugin-proposal-class-properties"),
              // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
              require.resolve("babel-plugin-remove-graphql-queries"),
              // use babel-plugin-react-docgen to ensure PropTables still appear
              require.resolve("babel-plugin-react-docgen"),
            ],
          },
        },
      ],
      exclude: [/node_modules\/(?!(gatsby)\/)/],
    })

    return config
  },
}
