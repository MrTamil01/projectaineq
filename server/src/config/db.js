import mongoose from "mongoose";

export let isMongoAvailable = false;

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/netmorph";
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2000
    });
    isMongoAvailable = true;
    console.log(`[NetMorph DB] Connected to MongoDB database at ${mongoURI}`);
  } catch (error) {
    isMongoAvailable = false;
    console.warn(`[NetMorph DB] MongoDB connection skipped/unavailable (${error.message}).`);
    console.log(`[NetMorph DB] Active Database: In-Memory Repository Fallback (Fully Functional Prototype Mode).`);
  }
};
