import { config } from 'dotenv'
config()

import express, { Express, NextFunction, Request, Response} from "express"
import cors from 'cors'

import connectDatabase from './database/connect'
import Post from "./models/Post"

const app: Express = express()
const PORT = process.env.PORT

app.use(cors({ origin: '*' }))
app.use(express.json())

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  connectDatabase()
})

app.get('/posts', async (req: Request, res: Response) => {
  const getAllPosts = await Post.find()
  res.send(getAllPosts)
})
