import { Request, Response } from "express";
import Post from "./../models/Post"

export async function getAllPosts(req: Request, res: Response) {
  const getAllPosts = await Post.find()
  res.send(getAllPosts)
}

export async function getOnePost(req: Request, res: Response) {
  const postId = req.params.postId
  if (postId.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const getOnePostByID = await Post.findOne({ title: 'salut test 123'})
      if (!getOnePostByID) {
        res.sendStatus(404)
      } else {
        res.send(getOnePostByID)
      }
    } catch (error) {
      console.log(error)
    }   
  } else {
    res.status(404).send(`Wrong format`)
  }
}

export async function createOnePost(req: Request, res: Response) {
  const newPost = new Post({
    title: req.body.title,
    description: req.body.description
  })
  const createdPost = await newPost.save()
  res.json(createdPost)
}

export async function deleteOnePost(req: Request, res: Response) {
  const postId = req.params.postId
  const deletePost = await Post.findByIdAndDelete(postId)
  res.send(deletePost)
}

export async function changeOnePost(req: Request, res: Response) {
  const postId = req.params.postId
  const changePost = await Post.findByIdAndUpdate(postId, 
  { 
    $set: 
    { 
      title: req.body.title,
      description: req.body.description
    }
  })
  res.send(changePost)
}