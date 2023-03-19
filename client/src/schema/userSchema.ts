import { object, string } from 'yup';

export const signupSchema = object({
  username: string().required().min(4),
  password: string().required().min(6).max(32),
  email: string().email().required()
});

export const loginSchema = object({
  username: string().required().min(4),
  password: string().required().min(6).max(32)
});