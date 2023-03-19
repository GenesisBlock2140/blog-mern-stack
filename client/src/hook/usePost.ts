import { useContext } from "react"
import { PostContext } from "../context/PostProvider"

// Without arg usePost return all posts or one post with postTitle arg
export const usePost = (postTitle?:string) => {

  const { blogPosts } = useContext(PostContext)
  if (!postTitle) return blogPosts

  const filterBlogPosts = [...blogPosts.filter(post => post.title === postTitle)]
  if (filterBlogPosts.length === 1) return filterBlogPosts

}