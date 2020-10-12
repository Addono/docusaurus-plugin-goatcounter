import {
  HtmlTags,
  LoadContext,
  OptionValidationContext,
  Plugin,
  ValidationResult
} from '@docusaurus/types'
import { ValidationError } from '@hapi/joi'
import PluginOptionSchema from './pluginOptionSchema'
import { PluginOptions } from './types'

export function validateOptions({
  validate,
  options
}: OptionValidationContext<PluginOptions, ValidationError>): ValidationResult<
  PluginOptions,
  ValidationError
> {
  const validatedOptions = validate(PluginOptionSchema, options)
  return validatedOptions
}

const plugin = (
  _context: LoadContext,
  options: PluginOptions
): Plugin<void, typeof PluginOptionSchema> => {
  const isProd = process.env.NODE_ENV === 'production'

  const analyticsDomain = `https://${options.code}.goatcounter.com`

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
