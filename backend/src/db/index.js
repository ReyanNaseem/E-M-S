import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';

const connectDB = async () => {
  try {
    const fullURI = `${process.env.MONGODB_URI}/${DB_NAME}?retryWrites=true&w=majority`;
    console.log("🔗 Connecting to:", fullURI);

    const connectionInstance = await mongoose.connect(fullURI);
    console.log("✅ MongoDB connected on host:", connectionInstance.connection.host);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
