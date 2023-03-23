import { PostTab } from "../components/PostTab"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { usePost } from "../hook/usePost"

import { svgPencil } from "../assets/svg/svgPencil"

export const Admin = () => {

  const postsData = usePost()

  return (
    <>
      <Header />
      <h1 className="text-center text-4xl text-gray-600 my-10">Administration</h1>
      <div className="max-w-[900px] mx-auto">
        <button className="flex items-center gap-2 bg-[#1d9bf0] text-white text-2xl px-3 py-1 m-4 rounded">
          Créer un article {svgPencil}
        </button>
        {
          postsData.map((post, key) => {
            return <PostTab 
            _id={post._id} 
            title={post.title} 
            description={post.description} 
            creationDate={post.creationDate} 
            author={post.author} 
            __v={post.__v} 
            key={key}/>
          })
        }
      </div>
      <Footer />
    </>
  )
}