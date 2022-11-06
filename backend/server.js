const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const path = require("path");

const userRoutes = require("./routes/user-routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  next();
});

app.get("/", (req, res) => {
  res.json({ status: "ok", txt: "REIGN KIT BACKEND" });
});
app.use("/api/users", userRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.PASSWORD}@cluster0.hjfrm.mongodb.net/reignkit?retryWrites=true&w=majority`
  )
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT);
    console.log("Server started successfully👍 at", PORT);
  })
  .catch((err) => {
    console.log(err.message);
  });
