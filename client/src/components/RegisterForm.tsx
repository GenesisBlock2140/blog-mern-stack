import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { Alert } from "./Alert"
import { postSignUp } from "../utils/Request";

import { signupSchema } from "../schema/userSchema";
import { InputForm } from "./UI/InputForm"
import { msgType } from "./Alert";

export const RegisterForm = () => {

  const [msgError, setMsgError] = useState<string>("")
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false)

  const usernameInput = useRef<HTMLInputElement>(null)
  const passwordInput = useRef<HTMLInputElement>(null)
  const emailInput = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e:React.SyntheticEvent) => {
    e.preventDefault()
    try {
      await signupSchema.validate({
        username: usernameInput.current?.value,
        password: passwordInput.current?.value,
        email: emailInput.current?.value
      })
      const tryRegister = await postSignUp(usernameInput.current?.value || "",passwordInput.current?.value || "", emailInput.current?.value || "")  
      if (tryRegister) {
        setRegisterSuccess(true)
        setMsgError("Bravo, vous pouvez maintenant vous connecter")
      } else {
        setMsgError("L'utilisateur existe déjà")
      }
    } catch (err:any) {
      console.log(err)
      setMsgError(err.message)
    }
    
  }

  return (
    <>
      <Alert alertMsg={msgError} type={registerSuccess ? msgType.success : msgType.danger} />
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