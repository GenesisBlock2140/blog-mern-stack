import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthProvider"
import { svgUser } from "../assets/svg/svgUser"
import { svgArrowClick } from "../assets/svg/svgArrowClick"

export const Header = () => {

  const { auth, logoutUser } = useContext(AuthContext)

  return (
    <>
      <div className="border-b-2 text-[#666]">
        <div className="flex justify-between h-[60px] items-center max-w-[1200px] mx-auto p-2 text-[20px]">
            <Link to={"/"} className="text-[25px]">Thisistech</Link>
            {auth != "" 
              ? 
                <p className="flex items-center gap-2">
                {svgUser}{auth} | <span className="cursor-pointer" onClick={logoutUser}>Déconnexion</span></p> 
              : 
              <div className="flex items-center">
                <Link to={"/login"} className="mr-2"> Connexion </Link>
                <Link to={"/register"} className="bg-[#1D9BF0] rounded-md px-3 py-1 text-white flex items-center">Inscription {svgArrowClick} </Link>
              </div>
            }
          </div>
      </div>
    </>
  )
}