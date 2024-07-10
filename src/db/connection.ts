import mongoose from "mongoose";

const mongoURI = process.env.MONGODB_URI || "your-mongodb-uri-here";

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
