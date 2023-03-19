import { createContext, ReactNode, useEffect, useState } from "react"
import { Posts } from "./types"

interface IPostContext {
  blogPosts: Posts[]
}

export const PostContext = createContext<IPostContext>({
  blogPosts: []
})

export const PostProvider = ({children}: {children: ReactNode}) => {

  const [blogPosts, setBlogPosts] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("http://localhost:5000/posts")
        const postData = await data.json()
        setBlogPosts(postData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[])

  return (
    <PostContext.Provider value={{blogPosts}}>
      {children}
    </PostContext.Provider>
  )

}