import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import ReactMarkdown from 'react-markdown'
import { usePost } from "../hook/usePost"
import { useParams, Navigate } from "react-router-dom"

export const Blog = () => {

  const {blogTitle} = useParams()
  const blogPosts = usePost(blogTitle?.split("-").join(" "))

  if (blogPosts.length === 0) {
    return <Navigate to="/404" />
  }
  
  const formatDate = (dateToFormat:string):string => {
    const date = new Date(dateToFormat)
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
  }
  

  return (
    <>
      <Header />
      <div className="max-w-[1200px] mx-auto my-20 p-2">
        <p className="text-center text-2xl text-[#1d2b36]">{blogPosts[0].author} <span className="text-[#85889b]"> | {formatDate(blogPosts[0].creationDate)}</span></p>
        <p className="text-center text-5xl text-[#1d2b36] my-10">{blogPosts[0].title}</p>
        <ReactMarkdown className="prose text-[18px]">
          {blogPosts[0].description}
        </ReactMarkdown>
      </div>
      <Footer />
    </>
  )
}