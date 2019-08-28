const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/api/users/index");
const tripRouter = require("./routes/api/trip/index");

mongoose
  .connect("mongodb://localhost:27017/fs05-xedike", {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("Connected successfully"))
  .catch(err => console.log(err));

const app = express();

app.use("/", express.static("public"));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware serve static file
app.use("upload/avatars", express.static("./upload/avatars"));

// route handler
app.use("/api/users", userRouter);
app.use("/api/trips", tripRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
