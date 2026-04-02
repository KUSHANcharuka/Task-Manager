const mongoose = require("mongoose");

let cachedConnection = null;
let cachedPromise = null;

async function connectDB() {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not set");
  }

  if (!cachedPromise) {
    cachedPromise = mongoose
      .connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
      })
      .then((mongooseInstance) => mongooseInstance)
      .catch((error) => {
        cachedPromise = null;
        throw error;
      });
  }

  cachedConnection = await cachedPromise;
  return cachedConnection;
}

module.exports = connectDB;
