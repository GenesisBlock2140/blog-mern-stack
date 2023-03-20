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
  const [isFetch, setIsFetch] = useState<boolean>(false)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("http://localhost:5000/posts")
        const postData = await data.json()
        setBlogPosts(postData)
      } catch (error) {
        console.log(error)
      }
      setIsFetch(true)
    }
    fetchData()
  },[])

  // Wait data fetch before render
  if (isFetch) {
  return (
    <PostContext.Provider value={{blogPosts}}>
      {children}
    </PostContext.Provider>
  ) 
  }

  return null

}