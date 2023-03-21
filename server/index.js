const express = require("express");
const { connectDb } = require("./db");
const { PORT } = require("./config");
const fileUpload = require('express-fileupload');

// Import routes
const router = require("./routes/posts.routes.js");

const app = express();
connectDb();

// Settings & middlewares
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './upload'
}));
app.set("port", PORT);

// Routes
app.use("/", router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
