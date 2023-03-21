const mongoose = require("mongoose");
const { MONGODB_URI } = require("./config")


async function connectDb() {
  try {
    const db = await mongoose.connect(MONGODB_URI);
    console.log("Connect to", db.connection.name);
  } catch (error) {
    console.log("error");
  }
}

module.exports = {
  connectDb,
};
