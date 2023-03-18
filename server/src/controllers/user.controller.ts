import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import User from '../models/User'
import { config } from "dotenv";
config();
import { signupValidator } from "../validator/signupValidator"
import { loginValidator } from "../validator/loginValidator"

export async function signUp(req: Request, res: Response) {

  const { error } = signupValidator(req.body)

  if (error) {
    return res.status(400).send(error.message)
  }

  const { email, username, password } = req.body
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)

  try {
    const newUser = new User({
      email, 
      username, 
      password: hashedPassword
    })
    const createdUser = await newUser.save()
    return res.json(createdUser.username)
  } catch (err) {
    console.log(err)
    return res.status(401).send("L'utilisateur existe déjà")
  }
}

export async function login(req: Request, res: Response) {

  const { error } = loginValidator(req.body)

  if (error) {
    return res.status(400).send(error.message)
  }

  const { username, password } = req.body

  try {
    const getUserInfo = await User.findOne({
      username: username
    })
    if (!getUserInfo) {
      return res.status(401).send("This user don't exist")
    }

    const isLoginValid = bcrypt.compareSync(password, getUserInfo.password)

    if (!isLoginValid) {
      return res.status(401).send("Mot de passe invalide")
    }

    const expIn30days = Date.now() + 1000 * 60 * 60 * 24 * 30
    // Store user _id in jwt and expire date of 30 days
    const token = jwt.sign(
      { 
        sub: getUserInfo._id, 
        exp: expIn30days 
      }, 
      process.env.SECRET!)

    res.cookie("Authorization", token, {
      expires: new Date(expIn30days),
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === "production"
    })

    res.sendStatus(200)
  } catch (err) {
    console.log(err)
  }
}

export async function logout(req: Request, res: Response) {
  // Clear the cookie "Authorization" which contains jwt ( from login successful )
  res.clearCookie('Authorization')
  return res.sendStatus(200)
}

// Using for check if middleware requireAuth working
export async function checkAuth(req: Request, res: Response) {
  console.log('Inside checkAuth fonc');
  res.status(200).send(req.body.username)
}