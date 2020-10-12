import * as Joi from '@hapi/joi'
import { PluginOptions } from 'types'

const PluginOptionSchema = Joi.object<PluginOptions>({
  code: Joi.string().required()
})

export default PluginOptionSchema
