import mongoose from "mongoose";

interface IUser {
  email: string;
  username: string;
  password: string;
  role: string
}

const Schema = mongoose.Schema

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: "utilisateur"
  }
})

const UserModel = mongoose.model('User', UserSchema)

export default UserModel