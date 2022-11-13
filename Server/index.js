import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";

dotenv.config({ path: ".env.local" }); // change to dotenv.config() for production and setup .env file

// Routes

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(bodyParser.json({ limit: "30mb", extented: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((info) => {
    console.log(`Mongoo Connection Success: ${info.connections[0].name}`);
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  })
  .catch((err) => console.log("error MongoDB connect: ", err));

// usage of routes
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
