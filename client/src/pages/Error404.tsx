import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Link } from "react-router-dom"

export const Error404 = () => {
  return (
    <>
      <Header />
      <div className="text-center text-gray-600 my-20 p-5">
        <h1 className="text-3xl">Page Introuvable</h1>
        <p className=" text-2xl my-4">On dirait que tu es perdu ... :c</p>
        <Link to={"/"} className="text-[20px] bg-[#eee] py-1 px-4 rounded uppercase">Retour à l'Accueil</Link>
      </div>
      <Footer />
    </>
  )
}