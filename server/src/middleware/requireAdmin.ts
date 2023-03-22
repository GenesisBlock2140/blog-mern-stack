import { Request, Response, NextFunction } from 'express'
import User from "./../models/User"

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  try {

    const user = await User.findOne({ username: req.body.username}).exec()

    if (!user) {
      return res.status(401)
    }

    if (user.role !== "admin") {
      console.log(user.role, "pas admin");
      return res.sendStatus(401)
    }
    
    next()
  } catch (err) {
    console.log(err)
    return res.sendStatus(401)
  }
}