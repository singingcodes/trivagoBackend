import express from "express";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import createError from "http-errors";
import cors from "cors";
import {
  unauthorizedHandler,
  forbiddenHandler,
  catchAllHandler,
} from "./errorHandlers.js";
import userRouter from "./apis/users/index.js";
import accomodationRouter from "./apis/accomodation/index.js";
import passport from "passport";
import googleStrategy from "./auth/googleOAuth.js";
import facebookStrategy from "./auth/facebookOAuth.js";

const server = express();
const port = process.env.PORT || 3001;
passport.use("google", googleStrategy);
passport.use("facebook", facebookStrategy);

// ************************************** MIDDLEWARES *****************************************

server.use(cors());
server.use(express.json());
server.use(passport.initialize());

// ************************************** ENDPOINTS *******************************************
server.use("/users", userRouter);
server.use("/accomodation", accomodationRouter);

// ************************************* ERROR HANDLERS ***************************************
server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(catchAllHandler);

mongoose.connect(process.env.MONGO_CONNECTION);

mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo!");
  server.listen(port, () => {
    console.table(listEndpoints(server));
  });
});
