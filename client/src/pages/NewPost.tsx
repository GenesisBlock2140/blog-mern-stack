import { Header } from "../components/Header"
import { Footer } from "../components/Footer"

import { svgPencil } from "../assets/svg/svgPencil"
import { useRef, useState } from "react"
import { postSchema } from "../schema/postSchema"
import { postCreatePost } from "../utils/Request"
import { Alert, msgType } from "../components/Alert"

export const NewPost = () => {

  const [msgError, setMsgError] = useState<string>("")
  const [createPostSuccess, setCreatePostSuccess] = useState<boolean>(false)

  const titleInput = useRef<HTMLInputElement>(null)
  const authorInput = useRef<HTMLInputElement>(null)
  const contentInput = useRef<HTMLTextAreaElement>(null)

  const handleSubmitNewPost = async (e:React.SyntheticEvent) => {
    e.preventDefault()
    try {
      await postSchema.validate({
        title: titleInput.current?.value,
        description: contentInput.current?.value,
        author: authorInput.current?.value
      })
      const tryCreateNewPost = await postCreatePost(contentInput.current?.value || "", titleInput.current?.value || "", authorInput.current?.value || "")
      if (tryCreateNewPost) {
        setCreatePostSuccess(true)
        setMsgError("L'article vient d'être publié.")
      } else {
        setMsgError("Une erreur est survenu.")
      }
    } catch (err:any) {
      console.log(err)
      setMsgError(err.message)
    }
  }

  return (
    <>
      <Header />
        <Alert alertMsg={msgError} type={createPostSuccess ? msgType.success : msgType.danger} />
        <h1 className="text-center text-4xl text-gray-600 my-10">Publier un nouveau article</h1>
        <div className="max-w-[900px] mx-auto text-gray-600">
          <form onSubmit={(e) => handleSubmitNewPost(e)}>
            <label className="p-2">Titre de l'article</label>
            <input type="text" className="w-full border-2 border-[#eee] rounded p-1 mb-2 text-xl" ref={titleInput} required />
            <label className="p-2">Auteur de l'article</label>
            <input type="text" className="w-full border-2 border-[#eee] rounded p-1 mb-2 text-xl" ref={authorInput} required />
            <label className="p-2">Contenu</label>
            <textarea className="w-full border-2 border-[#eee] rounded p-1 mb-2 text-[18px]" rows={15} ref={contentInput} required></textarea>
            <button className="flex items-center w-fit gap-2 bg-[#1d9bf0] text-white text-2xl px-3 py-1 m-4 rounded">Publier l'article {svgPencil}</button>
          </form>
        </div>
      <Footer />
    </>
  )
}