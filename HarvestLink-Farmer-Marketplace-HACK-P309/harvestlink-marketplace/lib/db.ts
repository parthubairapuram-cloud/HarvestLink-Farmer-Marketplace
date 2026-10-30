import mongoose from "mongoose";
const URI = process.env.MONGODB_URI;
if (!URI) throw new Error("Missing MONGODB_URI. Add it to .env.local or Vercel environment variables.");
type Cache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
declare global { var mongooseCache: Cache | undefined; }
const cache = global.mongooseCache ?? (global.mongooseCache = { conn: null, promise: null });
export async function connectDB() {
  if (cache.conn) return cache.conn;
  if (!cache.promise) cache.promise = mongoose.connect(URI!, { bufferCommands: false });
  cache.conn = await cache.promise;
  return cache.conn;
}