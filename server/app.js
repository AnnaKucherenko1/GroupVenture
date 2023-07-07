
const express = require("express");
const cors = require("cors");
const router = require("./router");
const session = require("express-session");

const app = express();

const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(
  session({
    name: "sid",
    cookie: {
      httpOnly: false,
      secure: false,
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 60,
    },
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cors(corsConfig));
app.use(express.json());
app.use("/", router);
module.exports = app;