import { Request, Response } from "express"
import { createPostValidator } from "../validator/createPostValidator"
import { postIdValidator } from "../validator/postIdValidator"
import Post from "./../models/Post"

export async function getAllPosts(req: Request, res: Response) {
  try {
    const getAllPosts = await Post.find()
    return res.send(getAllPosts) 
  } catch (err) {
    console.log(err);
  }
}

export async function getOnePost(req: Request, res: Response) {
  const { error } = postIdValidator(req.params.postId)

  if (error) {
    return res.send(error.message)
  }

  try {
    const getOnePostByID = await Post.findById(req.params.postId)
    if (!getOnePostByID) {
      return res.status(404).send('Post not find')
    }
    return res.send(getOnePostByID)
  } catch (err) {
    console.log(err)
  } 
}

export async function createOnePost(req: Request, res: Response) {
  const { error } = createPostValidator(req.body)

  if (error) {
    return res.send(error.message)
  }

  try {
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      creationDate: Date(),
      author: req.body.author
    })
    const createdPost = await newPost.save()
    return res.json(createdPost)
  } catch (err) {
    console.log(err)
  }
}

export async function deleteOnePost(req: Request, res: Response) {
  const { error } = postIdValidator(req.params.postId)

  if (error) {
    return res.send(error.message)
  }

  try {
    const deletePost = await Post.findByIdAndDelete(req.params.postId)
    return res.send(deletePost) 
  } catch (err) {
    console.log(err)
  }
}

export async function changeOnePost(req: Request, res: Response) {
  const { error } = createPostValidator(req.body)
  const { error: errorId} = postIdValidator(req.params.postId)
  
  if (error || errorId) {
    return res.send(
      `${error ? error?.message : ""} ${errorId ? errorId?.message : ""}`
    )
  }

  try {
    const changePost = await Post.findByIdAndUpdate(req.params.postId, 
    { 
      $set: 
      { 
        title: req.body.title,
        description: req.body.description
      }
    })
    res.send(changePost)
  } catch (err) {
    console.log(err)
  }
}