import Joi from 'joi'

interface postData {
  title: string;
  description: string;
  author: string;
}

const createPostSchema = Joi.object({
  title: Joi.string().min(10).max(120).required(),
  description: Joi.string().required(),
  author: Joi.string().required()
})

export const createPostValidator = (postData:postData) => {
  return createPostSchema.validate(postData)
}