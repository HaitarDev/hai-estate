const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const cors = require("cors");

const authRoute = require("./routes/authRoute");

env.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// routes ------------------
app.use("/api/auth", authRoute);

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
