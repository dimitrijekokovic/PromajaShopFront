import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI; // Postavi svoju MongoDB konekciju u `.env` fajlu

if (!MONGODB_URI) {
  throw new Error(
    'Definiši MONGODB_URI u .env fajlu'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
