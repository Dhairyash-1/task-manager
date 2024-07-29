import mongoose from "mongoose"

let isConnected = false

export async function connectDB() {
  if (isConnected) {
    console.log("DB already connected")
    return
  }

  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/task-manager`)
    console.log("MongoDB connected successfully.")
    isConnected = true

    // Add event listeners once
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
