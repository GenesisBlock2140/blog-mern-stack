import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { Blog } from './pages/Blog'
import { Register } from './pages/Register'
import { Login } from './pages/Login'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
