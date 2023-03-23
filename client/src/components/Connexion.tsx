import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { postLogin } from "../utils/Request";
import { Alert } from "./Alert";

import { loginSchema } from "../schema/userSchema";
import { InputForm } from "./UI/InputForm";
import { msgType } from "./Alert";

export const Connexion = () => {

  const usernameInput = useRef<HTMLInputElement>(null)
  const passwordInput = useRef<HTMLInputElement>(null)

  const [msgError, setMsgError] = useState<string>("")

  const { setAuth } = useContext(AuthContext)

  const handleSubmit = async (e:React.SyntheticEvent) => {
    e.preventDefault()
    try {
      await loginSchema.validate({
        username: usernameInput.current?.value,
        password: passwordInput.current?.value
      })
      const tryLogin = await postLogin(usernameInput.current?.value || "",passwordInput.current?.value || "", setAuth)
      if (tryLogin) {
        console.log("Connexion OK");
      } else {
        setMsgError("Mot de passe incorrect")
      }
    } catch (err:any) {
      console.log(err)
      setMsgError(err.message)
    }
    
  }

  return (
    <>
      <Alert alertMsg={msgError} type={msgType.danger} />
      <div className="max-w-[450px] mx-auto border-2 border-[##cae6ff] rounded-md p-4 my-4">
        <form onSubmit={(e) => handleSubmit(e)}>
          <p className="font-light text-[30px] text-[#666] text-center">ESPACE DE <span className="text-[#1d9bf0]">CONNEXION</span></p>
          <InputForm nameLabel="Nom d'utilisateur" typeInput="text" refInput={usernameInput} />
          <InputForm nameLabel="Mot de passe" typeInput="password" refInput={passwordInput} />
          <button className="text-[20px] bg-[#1D9BF0] rounded-md uppercase px-4 py-1 text-white m-4 block mx-auto">Se connecter</button>
        </form>
        <div className="text-center text-[16px] my-8 text-[#3a3a3a]">
            <p>Mot de passe oublié ?</p>
            <p>Pas encore inscrit ? <Link to={"/register"} className="text-[#1d9bf0]">Inscription</Link></p>
        </div>
      </div>
    </>
  )
}