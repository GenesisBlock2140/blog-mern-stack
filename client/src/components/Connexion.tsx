import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { object, string } from 'yup';
import { AuthContext } from "../context/AuthProvider";
import { postLogin } from "../utils/Request";
import { MsgErrorForm } from "./MsgErrorForm";

import { InputForm } from "./UI/InputForm";

export const Connexion = () => {

  const usernameInput = useRef<HTMLInputElement>(null)
  const passwordInput = useRef<HTMLInputElement>(null)

  const [msgError, setMsgError] = useState<string>("")

  const { auth, setAuth } = useContext(AuthContext)
  console.log(auth);
  
  const loginSchema = object({
    username: string().required().min(4),
    password: string().required().min(6).max(32)
  });

  const handleSubmit = async (e:React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const valid = await loginSchema.validate({
        username: usernameInput.current?.value,
        password: passwordInput.current?.value
      })
      postLogin(usernameInput.current?.value || "",passwordInput.current?.value || "", setAuth)
      console.log("valid");
    } catch (err) {
      console.log(err)
      setMsgError(err.message)
    }
    
  }

  return (
    <>
      <MsgErrorForm msgError={msgError} />
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