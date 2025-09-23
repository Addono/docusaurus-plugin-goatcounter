# Docusausus GoatCounter Plugin

[![License](https://img.shields.io/github/license/Addono/docusaurus-plugin-goatcounter?style=flat-square)](https://github.com/Addono/docusaurus-plugin-goatcounter/blob/master/LICENSE)
[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://img.shields.io/badge/project%20status-Active-greengrass?style=flat-square)](https://www.repostatus.org/#active)
[![Depfu](https://img.shields.io/depfu/Addono/docusaurus-plugin-goatcounter?style=flat-square)](https://depfu.com/github/Addono/docusaurus-plugin-goatcounter)
[![npm](https://img.shields.io/npm/dt/docusaurus-plugin-goatcounter?style=flat-square)](https://www.npmjs.com/package/docusaurus-plugin-goatcounter)
[![npm](https://img.shields.io/npm/v/docusaurus-plugin-goatcounter?style=flat-square)](https://www.npmjs.com/package/docusaurus-plugin-goatcounter)
[![GitHub stars](https://img.shields.io/github/stars/Addono/docusaurus-plugin-goatcounter?style=flat-square)](https://github.com/Addono/docusaurus-plugin-goatcounter/stargazers)<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

## 📝 Table of Contents

- [About](#about)
- [Install](#install)
- [Getting Started](#getting_started)
- [Contributors](#contributors)

## 🧐 About <a name = "about"></a>

This plugin adds GoatCounter web analytics to your Docusaurus v3 project. It has zero dependencies, the only thing this plugin does is including the tracking script in your production build outputs.

## 🚀 Install <a name = "install"></a>

First, add the plugin as a dependency to your project.

```bash
# Yarn
yarn add docusaurus-plugin-goatcounter

# npm
npm install docusaurus-plugin-goatcounter
```

Then, configure Docusaurus to use your plugin by adding the following to `docusaurus.config.js`. Replace `your-goatcounter-code` with the identifier of your GoatCounter instance. E.g. if you access GoatCounter at https://acmecorp.goatcounter.com, then your code is `acmecorp`.

```js
module.exports = {
  plugins: ['docusaurus-plugin-goatcounter'],
  themeConfig: {
    goatcounter: {
      code: 'your-goatcounter-code',
    },
  },
};
```

> [!WARNING]
> **When building your website for production**, set `NODE_ENV=production`. **If not, the plugin will not inject the Goatcounter tag**, in order to prevent including non-production traffic in your Goatcounter statistics.

## 🏁 Getting Started <a name = "getting_started"></a>

Below is a list of commands you can use for development.

### `yarn start`

Runs the project in development/watch mode.

### `yarn build`

Bundles the package to the `dist` folder.

### `yarn test`

Runs the test watcher (Jest) in an interactive mode. By default, runs tests related to files changed since the last commit.

## ✨ Contributors <a name = "contributors"></a>

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://aknapen.nl"><img src="https://avatars1.githubusercontent.com/u/15435678?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Adriaan Knapen</b></sub></a><br /><a href="https://github.com/Addono/docusaurus-plugin-goatcounter/commits?author=Addono" title="Code">💻</a> <a href="#tool-Addono" title="Tools">🔧</a> <a href="https://github.com/Addono/docusaurus-plugin-goatcounter/commits?author=Addono" title="Documentation">📖</a> <a href="https://github.com/Addono/docusaurus-plugin-goatcounter/commits?author=Addono" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
