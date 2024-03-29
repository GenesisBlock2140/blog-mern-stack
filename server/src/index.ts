import { config } from "dotenv";
config();

import express, { Express } from "express";
import cookieParser from 'cookie-parser'
import cors from "cors";

import connectDatabase from "./database/connect";
import {
  getAllPosts,
  getOnePost,
  createOnePost,
  deleteOnePost,
  changeOnePost,
} from "./controllers/post.controller";
import { checkAuth, login, logout, signUp } from "./controllers/user.controller";
import { requireAuth } from "./middleware/requireAuth";
import { requireAdmin } from "./middleware/requireAdmin";
import { loginLimiter } from "./middleware/loginLimiter";

const app: Express = express();
const PORT = process.env.PORT;

// credentials: true for cookie
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  connectDatabase();
});

// Post Routes

app.get("/posts", getAllPosts);

app.get("/posts/:postId", getOnePost);

app.post("/posts", requireAuth, requireAdmin, createOnePost);

app.delete("/posts/:postId", requireAuth, requireAdmin, deleteOnePost);

app.put("/posts/:postId", requireAuth, requireAdmin, changeOnePost);

// User Routes

app.post("/signup", signUp);

app.post("/login", loginLimiter, login);

app.post("/logout", requireAuth, logout);

app.post("/checkauth", requireAuth, checkAuth)
