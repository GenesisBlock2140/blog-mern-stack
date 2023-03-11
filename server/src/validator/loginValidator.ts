import Joi from 'joi'

interface ILogin {
  username: string;
  password: string;
}

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required().min(6).max(32)
})

export const loginValidator = (loginData:ILogin) => {
  return loginSchema.validate(loginData)
}