import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthProvider"

export const Header = () => {

  const { auth, logoutUser } = useContext(AuthContext)

  return (
    <>
      <div className="border-b-2 text-[#666]">
        <div className="flex justify-between h-[60px] items-center max-w-[1200px] mx-auto p-2">
            <Link to={"/"} className="text-[25px]">BLOG</Link>
            {auth != "" 
              ? <p>{auth} | <span className="cursor-pointer" onClick={logoutUser}>Déconnexion</span></p> 
              : <Link to={"/login"} className="text-[20px] bg-[#1D9BF0] rounded-md uppercase px-4 py-1 text-white">Connexion</Link>
            }
          </div>
      </div>
    </>
  )
}