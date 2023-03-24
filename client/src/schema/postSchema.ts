import { object, string } from 'yup';

export const postSchema = object({
  title: string().required().min(10).max(120),
  description: string().required(),
  author: string().required()
});