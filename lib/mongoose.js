import mongoose from "mongoose";

const mongooseConnect = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  return mongoose.connect(uri);
};

export default mongooseConnect;
