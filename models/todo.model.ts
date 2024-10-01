import mongoose, { Document, Model, Schema } from "mongoose"
const frequencyEnum = ["DAILY", "WEEKLY", "MONTHLY", "NONE"]
export interface ITodo extends Document {
  title: string
  description: string
  priority: "low" | "medium" | "high"
  status: "todo" | "inprogress" | "inreview" | "finished"
  deadline: Date
  owner: string
  content: string
  isRecurring: Boolean
  frequency?: "DAILY" | "WEEKLY" | "MONTHLY" | "NONE"
  day?: Number
  date?: Number
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
    isRecurring: {
      type: Boolean,
      default: false,
    },
    frequency: {
      type: String,
      enum: frequencyEnum,
      default: "NONE",
    },
    day: {
      type: Number,
      default: undefined,
    },
    date: {
      type: Number,
      default: undefined,
    },
  },
  { timestamps: true }
)

const Todo: Model<ITodo> =
  mongoose.models.Todo || mongoose.model<ITodo>("Todo", todoSchema)
export default Todo
