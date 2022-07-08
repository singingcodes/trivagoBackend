import express from "express"

import cors from "cors"
import {
  unauthorizedHandler,
  forbiddenHandler,
  catchAllHandler,
  notFoundHandler,
} from "./errorHandlers"
import userRouter from "./apis/users/index"
import accommodationRouter from "./apis/accommodation/index"
import passport from "passport"
//import googleStrategy from "./auth/googleOAuth"
// import facebookStrategy from "./auth/facebookOAuth.js"

const server = express()

//passport.use("google", googleStrategy)
// passport.use("facebook", facebookStrategy)

// ************************************** MIDDLEWARES *****************************************

server.use(cors())
server.use(express.json())
server.use(passport.initialize())

// ************************************** ENDPOINTS *******************************************
server.use("/users", userRouter)
server.use("/accommodation", accommodationRouter)

// ************************************* ERROR HANDLERS ***************************************
server.use(unauthorizedHandler)
server.use(forbiddenHandler)
server.use(catchAllHandler)
server.use(notFoundHandler)


export{server}
