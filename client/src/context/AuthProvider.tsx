import { createContext, ReactNode, useState } from "react";

interface IAuthContext {
  auth: string
  setAuth: (c: string) => void,
  isLogin: () => boolean,
  logoutUser: () => void
}

export const AuthContext = createContext<IAuthContext>({
  auth: "",
  setAuth: () => {},
  isLogin: () => false,
  logoutUser: () => {}
})

export const AuthProvider = ({children}: {children: ReactNode} ) => {
  const [auth, setAuth] = useState("")

  const checkAlreadyLogin =  async () => {
    const data = await fetch("http://localhost:5000/checkauth", {
      method: "POST",
      headers: {'Access-Control-Allow-Origin': 'http://localhost:5173/login', 'Content-Type': 'application/json'},
      credentials: "include"
    })

    if (data.status === 200) {
      const tt = await data.text()
      setAuth(tt)
    }
    
  }

  checkAlreadyLogin()
  
  const isLogin = ():boolean => {
    return auth !== "" ? true : false
  }

  const logoutUser = async () => {
    const data = await fetch("http://localhost:5000/logout", {
      method: "POST",
      headers: {'Access-Control-Allow-Origin': 'http://localhost:5173/login', 'Content-Type': 'application/json'},
      credentials: "include"
    })

    if (data.status === 200) {
      setAuth("")
    }
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, isLogin, logoutUser}}>
      {children}
    </AuthContext.Provider>
  )

}