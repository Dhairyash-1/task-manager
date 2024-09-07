import mongoose from "mongoose"

export async function connectDB() {
  mongoose.set("strictQuery", true)

  if (!process.env.MONGODB_URI) {
    console.log("MISSING MONGODB_URL")
    return
  }

  // Check if Mongoose is already connected
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB already connected")
    return
  }

  // Check if Mongoose is connecting (optional, to handle in-progress connections)
  if (mongoose.connection.readyState === 2) {
    console.log("MongoDB connection in progress")
    return
  }

  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/task-manager`)
    console.log("MongoDB connected successfully.")

    // Add event listeners once after connection is established
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to DB cluster")
    })

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err.message)
    })

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected")
    })

    // Graceful shutdown
    process.on("SIGINT", async () => {
      await mongoose.connection.close()
      console.log("Mongoose connection closed due to app termination")
      process.exit(0)
    })
  } catch (error: any) {
    console.error("MongoDB connection error:", error.message)
    process.exit(1)
  }
}
