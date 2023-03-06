import mongoose from "mongoose"

const Schema = mongoose.Schema

interface IPost {
  title: string;
  description: string;
  creationDate: Date;
  author: string;
}

const PostSchema = new Schema<IPost>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    required: true
  },
  author: {
    type: String,
    required: true
  }
})

const PostModel = mongoose.model('Post', PostSchema)

export default PostModel