import mongoose from "mongoose"
import listEndpoints from "express-list-endpoints"
import {  server } from "./server"

const port = process.env.PORT || 3001
if(process.env.MONGO_CONNECTION){
    mongoose.connect(process.env.MONGO_CONNECTION)
  }else{
    throw new Error("No MONGO_CONNECTION environment variable found")
  }
  
  mongoose.connection.on("connected", () => {
    console.log("Connected to Mongo!")
    server.listen(port, () => {
      console.table(listEndpoints(server))
    })
  })