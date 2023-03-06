import { config } from "dotenv";
config();

import express, { Express } from "express";
import cors from "cors";

import connectDatabase from "./database/connect";
import {
  getAllPosts,
  getOnePost,
  createOnePost,
  deleteOnePost,
  changeOnePost,
} from "./controllers/post.controller";

const app: Express = express();
const PORT = process.env.PORT;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  connectDatabase();
});

app.get("/posts", getAllPosts);

app.get("/posts/:postId", getOnePost);

app.post("/posts", createOnePost);

app.delete("/posts/:postId", deleteOnePost);

app.put("/posts/:postId", changeOnePost);
