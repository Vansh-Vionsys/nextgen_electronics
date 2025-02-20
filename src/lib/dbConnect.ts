import mongoose from "mongoose";
const uri = process.env.DATABASE_URL!;

type ConnectionObject = {
  isConnected?: number;
};
const connection: ConnectionObject = {};
const dbConnect = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }
  try {
    const db = await mongoose.connect(uri, {});
    connection.isConnected = db.connections[0].readyState;
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("Database Connection failed", error);
  }
};

export default dbConnect;

//-----------------------------------
// import mongoose from "mongoose";
// const mongoDbUrl = process.env.DATABASE_URL!;

// if (!mongoDbUrl) throw new Error("DATABASE_URL is not defined");
// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// const dbConnect = async () => {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose
//       .connect(mongoDbUrl)
//       .then(() => mongoose.connection);

//     cached.conn = await cached.promise;
//   }
//   try {
//     cached.conn = await cached.promise;
//   } catch (error) {
//     cached.promise = null;
//   }
//   return cached.conn;
// };

// export default dbConnect;
//-----------------------------------
// import mongoose from "mongoose";

// type ConnectionObject = {
//   isConnected?: number;
// };

// const connection: ConnectionObject = {};

// async function dbConnect(): Promise<void> {
//   if (connection.isConnected) {
//     console.log("Already connected to database");
//     return;
//   }
//   try {
//     const db = await mongoose.connect(process.env.DATABASE_URL || "", {});
//     connection.isConnected = db.connections[0].readyState;

//     console.log("DB Connected Successfully");
//   } catch (error) {
//     console.log("Database Connection failed", error);
//     process.exit(1);
//   }
// }

// export default dbConnect;
