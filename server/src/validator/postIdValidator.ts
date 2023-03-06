import Joi from 'joi'

const postIdSchema = Joi.object({
  id: Joi.string().length(24).pattern(/^[0-9a-fA-F]{24}$/).required()
})

export const postIdValidator = (id:string) => {
  return postIdSchema.validate({ id })
}