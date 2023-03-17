import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { MsgErrorForm } from "./MsgErrorForm"

import { InputForm } from "./UI/InputForm"

export const RegisterForm = () => {

  const [msgError, setMsgError] = useState<string>("")

  const usernameInput = useRef<HTMLInputElement>(null)
  const passwordInput = useRef<HTMLInputElement>(null)
  const emailInput = useRef<HTMLInputElement>(null)

  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault()
  }

  return (
    <>
      <MsgErrorForm msgError={msgError} />
      <div className="max-w-[450px] mx-auto border-2 border-[##cae6ff] rounded-md p-4 my-4">
        <form onSubmit={(e) => handleSubmit(e)}>
          <p className="font-light text-[30px] text-[#666] text-center">ESPACE D'<span className="text-[#1d9bf0]">INSCRIPTION</span></p>
          <InputForm nameLabel="Nom d'utilisateur" typeInput="text" refInput={usernameInput} />
          <InputForm nameLabel="Mot de passe" typeInput="password" refInput={passwordInput} />
          <InputForm nameLabel="Adresse mail" typeInput="email" refInput={emailInput} />
          <button className="text-[20px] bg-[#1D9BF0] rounded-md uppercase px-4 py-1 text-white m-4 block mx-auto">S'inscrire</button>
        </form>
        <div className="text-center text-[16px] my-8 text-[#3a3a3a]">
            <p>Mot de passe oublié ?</p>
            <p>Déjà inscrit ? <Link to={"/login"} className="text-[#1d9bf0]">Connexion</Link></p>
        </div>
      </div>
    </>
  )
}