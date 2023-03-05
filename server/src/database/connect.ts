import mongoose from 'mongoose'
import { config } from 'dotenv'
config()

function connectDatabase() {
  
  return mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log(`Database successfully connected`);
  })
  .catch((error) => {
    console.log(`Database connect error: ${error}`)
    process.exit(1)
  })

}

export default connectDatabase