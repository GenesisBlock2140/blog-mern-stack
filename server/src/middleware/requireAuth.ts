import { config } from "dotenv";
config();

import jwt from 'jsonwebtoken'
import User from '../models/User'
import { Request, Response, NextFunction } from 'express'

export async function requireAuth(req: Request, res: Response, next: NextFunction) {

  if (!req.cookies.Authorization){
    return res.sendStatus(401)
  }

  try {
    const token = req.cookies.Authorization
    
    // Decode the token
    const decodedToken = jwt.verify(token, process.env.SECRET!)

    // Check if jwt is not expired
    const exp = (decodedToken as any).exp
    if(Date.now() > exp){
      return res.sendStatus(401)
    }

    // Get user info using _id store in 'sub' in decodedToken
    const user = await User.findById(decodedToken.sub)

    if (!user) {
      return res.sendStatus(401)
    }

    req.body.username = user.username

    next() 
  } catch (err) {
    console.log(err)
    return res.sendStatus(401)
  }
}