import Joi from 'joi'

interface ISignup {
  email: string;
  username: string;
  password: string;
}

const signupSchema = Joi.object({
  email: Joi.string().required().lowercase(),
  username: Joi.string().required(),
  password: Joi.string().required().min(6).max(32)
})

export const signupValidator = (signupData:ISignup) => {
  return signupSchema.validate(signupData)
}