import { useState } from "react"
import { Posts } from "../context/types"
import { postChangePost, postDelete } from "../utils/Request"
import { Alert, msgType } from "./Alert"

export const PostTab = (postData:Posts) => {

  const [alertMsg, setAlertMsg] = useState<string>("")
  const [isSuccess, setIsSuccess] = useState<msgType>(msgType.success)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [postContent, setPostContent] = useState<string>(postData.description)
  const [postTitle, setPostTitle] = useState<string>(postData.title)

  const handleDelete = async () => {
    const deleteOne = await postDelete(postData._id)
    if (deleteOne) {
      setAlertMsg("Suppression de l'article réussi")
      setIsSuccess(msgType.success)
      return 
    }
    setIsSuccess(msgType.danger)
    setAlertMsg("Impossible d'effectuer cette suppression")
  }

  const handleEditMode = () => {
    setEditMode(prevEdit => !prevEdit)
  }

  const handleSaveEdit = async () => {
    const editOne = await postChangePost(postContent, postTitle, postData.author , postData._id)
    console.log(editOne)
    if (editOne) {
      setAlertMsg("Modification de l'article réussi")
      setIsSuccess(msgType.success)
      return 
    }
    setIsSuccess(msgType.danger)
    setAlertMsg("Impossible d'effectuer cette modification")
  }

  return (
    <>
      <Alert alertMsg={alertMsg} type={isSuccess} />
      <div className="flex flex-wrap justify-between items-center my-2 bg-[#eee] rounded p-2 gap-2 text-[18px]">
        <p>{postData._id}</p>
        <p className="max-w-[350px]">{postData.title}</p>
        <div className="text-white">
          {editMode ? <button className="bg-[#1d9bf0] px-3 py-[2px] mr-2 rounded" onClick={handleSaveEdit}>Sauvegarder</button> : null}
          <button className={`${editMode ? "bg-[#1d3242]" : "bg-[#3b6079]"} px-3 py-[2px] mr-2 rounded`} onClick={handleEditMode}>Modifer</button>
          <button className="bg-[#e43a3a] px-3 py-[2px] mr-2 rounded" onClick={handleDelete}>Supprimer</button>
        </div>
      </div>
      {editMode ?
        <div>
          <input className="w-[100%] border-2 border-[#eee] rounded p-1 mb-2" value={postTitle} onChange={(e) => setPostTitle(e.currentTarget.value)} />
          <textarea className="w-[100%] border-2 border-[#eee] rounded p-1" rows={10} value={postContent} onChange={(e) => setPostContent(e.currentTarget.value)}></textarea>
        </div>
        : null }
    </>
  )
}