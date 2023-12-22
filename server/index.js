const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");

env.config();

// middlewares ----------------------
const app = express();
app.use(express.json());

app.use(cookieParser());
app.use(
  cors({
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

app.use(express.static(path.join(__dirname, "public")));

// routes ------------------
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

// connect
mongoose.connect(process.env.MONGO_URL);
app.listen(process.env.PORT, () => {
  console.log(`app listen on ${process.env.PORT}`);
});

// error handlers ------------------------

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
