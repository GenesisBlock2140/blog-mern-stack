import { Link } from "react-router-dom"

export const AlreadyConnected = () => {
  return (
    <>
      <div className="text-center text-gray-600 my-20">
        <h1 className="text-4xl my-4">Vous êtes déjà connecté.</h1>
        <Link to={"/"} className="text-[20px] bg-[#eee] py-1 px-4 rounded uppercase">Retour à l'Accueil</Link>
      </div>
    </>
  )
}