import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';

const connectDB = async () => {
  const fullURI = `${process.env.MONGODB_URI}/${DB_NAME}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(fullURI, {
      serverSelectionTimeoutMS: 5000, // Try finding a server for 5s before error
      socketTimeoutMS: 45000,         // Close sockets after 45s inactivity
    });

    console.log(`✅ MongoDB connected on host: ${mongoose.connection.host}`);

    // Event listeners for reliability
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected! Trying to reconnect...');
      connectDB(); // Retry on disconnect
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err.message);
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    setTimeout(connectDB, 5000); // Retry after 5 seconds
  }
};

export default connectDB;
