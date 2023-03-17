import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"
import { Connexion } from "../components/Connexion"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { AlreadyConnected } from "../components/AlreadyConnected"

export const Login = () => {

  const { isLogin } = useContext(AuthContext)

  return (
    <>
      <Header />
      { !isLogin() ? <Connexion /> : <AlreadyConnected />}
      <Footer />
    </>
  )
}