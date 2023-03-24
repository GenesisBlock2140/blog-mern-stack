import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { Blog } from './pages/Blog'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Error404 } from './pages/Error404'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from './context/AuthProvider'
import { PostProvider } from './context/PostProvider'
import { Admin } from './pages/Admin'
import { NewPost } from './pages/NewPost'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "register",
    element: <Register />
  },
  {
    path: "blog/:blogTitle",
    element: <Blog />
  },
  {
    path: "*",
    element: <Error404 />
  },
  {
    path: "panel",
    element: <Admin />
  },
  {
    path: "panel/nouveau",
    element: <NewPost />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PostProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </PostProvider>
  </React.StrictMode>,
)
