import mongoose from "mongoose"

const Schema = mongoose.Schema

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
})

const PostModel = mongoose.model('Post', PostSchema)

export default PostModel