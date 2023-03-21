const dotenv = require('dotenv');
// Para leer variables de mi pc
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/MERN-context-CRUD";
const PORT = process.env.PORT || 8080;

module.exports = {
    MONGODB_URI,
    PORT
  };