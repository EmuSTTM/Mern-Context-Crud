const express = require("express");
const { connectDb } = require("./db");
const { PORT } = require("./config");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
// Import routes
const router = require("./routes/posts.routes.js");
const cors = require("cors");
const path = require("path");

// Necesarios para el development
const compression = require("compression");

const app = express();
connectDb();

// Settings & middlewares

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Con esto hacemos que el front-end esté compilado en el
// backend
const buildPath = path.join(__dirname, "..", "client", "build");
app.use(express.static(buildPath));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);

app.use(compression());

app.set("port", PORT);

// Routes
app.use("/", router);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
