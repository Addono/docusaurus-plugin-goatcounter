# Docusausus GoatCounter Plugin

## 📝 Table of Contents

- [About](#about)
- [Install](#install)
- [Getting Started](#getting_started)

##🧐 About <a name = "about"></a>

This plugin adds GoatCounter web analytics to your Docusaurus v2 project.

## 🚀 Install <a name = "install"></a>

First, add the plugin as a dependency to your project.

```bash
# Yarn
yarn add docusaurus-plugin-goatcounter

# npm
npm install docusaurus-plugin-goatcounter
```

Then, configure Docusaurus to use your plugin by adding the following to `docusaurus.config.js`. Replace `your-goatcounter-code` with the identifier of your GoatCounter instance. E.g. if you acecss GoatCounter at https://acmecorp.goatcounter.com, then your code is `acmecorp`.

```js
module.exports = {
  plugins: [ 'docusaurus-plugin-goatcounter', ],
  themeConfig: {
    goatcounter: {
      code: 'your-goatcounter-code',
    },
  },
}
```


## 🏁 Getting Started <a name = "getting_started"></a>

Below is a list of commands you can use for development.

### `yarn start`

Runs the project in development/watch mode.

### `yarn build`

Bundles the package to the `dist` folder. 

### `yarn test`

Runs the test watcher (Jest) in an interactive mode. By default, runs tests related to files changed since the last commit.
