
const express = require("express");
const cors = require("cors");
const router = require("./router");
const session = require("express-session");
const Redis = require("ioredis");
const RedisStore = require("connect-redis").default;
const app = express();

const { FLY, REDIS_URL } = process.env

const redisClient = new Redis(FLY ? REDIS_URL : "", {
  family: 6
});

redisClient.on("connect", () => {
  console.log("Redis client connected");
});

redisClient.on("error", (err) => {
  console.log("Something went wrong " + err);
});

let redisStore = new RedisStore({
  client: redisClient,
  disableTouch: true,
});

const corsConfig = {
  origin: ["http://localhost:3000", "https://group-venture.vercel.app"],
  credentials: true,
};

app.use(
  session({
    name: "sid",
    store: redisStore,
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