const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.URI; 
const client = new MongoClient(uri);

let db;

const connectDb = async () => {
  if (!db) {
    await client.connect();
    db = client.db("Restaurant");
    console.log(" MongoDB connected successfully to database:", db.databaseName);
  }
  return db; 
};

module.exports = connectDb;
