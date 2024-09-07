import mongoose, { Document, Model, Schema } from "mongoose"

export interface ITodo extends Document {
  title: string
  description: string
  priority: "low" | "medium" | "high"
  status: "todo" | "inprogress" | "inreview" | "finished"
  deadline: Date
  owner: string
  content: string
}

const todoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "urgent"],
      default: null,
    },
    status: {
      type: String,
      enum: ["todo", "inprogress", "inreview", "finished"],
      required: true,
    },
    deadline: {
      type: Date,
      default: null,
    },
    owner: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
)

const Todo: Model<ITodo> =
  mongoose.models.Todo || mongoose.model<ITodo>("Todo", todoSchema)
export default Todo
