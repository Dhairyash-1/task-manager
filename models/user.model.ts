import mongoose, { Schema, Document, Model } from "mongoose"

interface IUser extends Document {
  fullName: string
  email: string
  password: string
}

const UserSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema)

export default User
