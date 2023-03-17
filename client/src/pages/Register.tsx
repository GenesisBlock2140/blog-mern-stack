import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"
import { AlreadyConnected } from "../components/AlreadyConnected"
import { Header } from "../components/Header"
import { RegisterForm } from "../components/RegisterForm"
import { Footer } from "../components/Footer"

export const Register = () => {

  const { isLogin } = useContext(AuthContext)

  return (
    <>
      <Header />
      { !isLogin() ? <RegisterForm /> : <AlreadyConnected />}
      <Footer />
    </>
  )
}