const express = require("express");
const { connectDb } = require("./db");
const { PORT } = require("./config");
const fileUpload = require('express-fileupload');
const  morgan  = require('morgan');
// Import routes
const router = require("./routes/posts.routes.js");
const cors = require('cors');


const app = express();
connectDb();

// Settings & middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './upload'
}));


app.set("port", PORT);

// Routes
app.use("/", router);


// Starting the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
