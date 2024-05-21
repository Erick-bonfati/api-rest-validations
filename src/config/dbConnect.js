import mongoose from "mongoose";

mongoose.connect(process.env.CONNECTMONGO);

let db = mongoose.connection;

export default db;