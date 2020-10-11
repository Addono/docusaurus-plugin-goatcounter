import { HtmlTags, LoadContext, Plugin } from '@docusaurus/types'

const plugin = ({ siteConfig: { themeConfig } }: LoadContext): Plugin<void> => {
  const { goatcounter }: any = themeConfig || {}

  if (!goatcounter) {
    throw new Error(
      `You need to specify 'goatcounter' object in 'themeConfig' with 'code' field in it to use docusaurus-plugin-goatcounter`
    )
  }

  const code = goatcounter?.code

  if (!code) {
    throw new Error(
      'You specified the `goatcounter` object in `themeConfig` but the `code` field was missing. ' +
        'Please add it.'
    )
  }
  if (typeof code !== 'string') {
    throw new Error(
      'You specified the `goatcounter` object in `themeConfig` but the `code` field should be a string.'
    )
  }

  const isProd = process.env.NODE_ENV === 'production'

  const analyticsDomain = `https://${code}.goatcounter.com`

  const injectGoatcounterTags = (): { headTags: HtmlTags } => {
    return {
      headTags: [
        {
          tagName: 'link',
          attributes: {
            rel: 'preconnect',
            href: analyticsDomain
          }
        },
        {
          tagName: 'script',
          attributes: {
            async: true,
            src: '//gc.zgo.at/count.js',
            'data-goatcounter': `${analyticsDomain}/count`
          }
        }
      ]
    }
  }

  return {
    name: 'docusaurus-plugin-goatcounter',
    injectHtmlTags: isProd ? injectGoatcounterTags : undefined
  }
}

export default plugin
