
import mongoose from "mongoose"
import supertest from "supertest"
import dotenv from "dotenv"
import { server } from "../src/server"
import UsersModel from "../src/apis/users/model"

dotenv.config()
const client = supertest(server)
beforeAll(async () => {
    // Before all hook could be used to connect to mongo and also do some initial setup (like inserting some mock data)
    await mongoose.connect(process.env.MONGO_TESTDB_URL!) // DO NOT FORGET TO CONNECT TO MONGO! OTHERWISE YOU GONNA GET SOME TIMEOUT ERRORS
  })
  
  afterAll(async () => {
   
    await UsersModel.deleteMany()
    await mongoose.connection.close()
  })
const validUser = {
    email: "johndoe@gmail.com",
    password: "123456",
    role: "guest",
    googleID: "123456789",}

    const invalidUser = {
        email: "",
        password: "",
        role: "",
        googleID: "",
    }
   let token: string
   describe("Tests users' endpoints", () => {
    test("Should check that when POST /users/register it returns 201 and a valid _id", async () => {
        const response = await client.post("/users/register").send(validUser).expect(201)
        expect(response.body).toHaveProperty("_id")
      })
      test("Should check that we can login using POST /users/login with a valid user", async () => {
        const response = await client.post("/users/login").send(validUser).expect(200)
        expect(response.body).toHaveProperty("accessToken")
        token = response.body.accessToken
      })
      test("Should check that we cannot login using POST /users/login with wrong credentials", async () => {
        await client.post("/users/login").send(invalidUser).expect(401)
      })
    
      test("Should check that GET /users returns users if you provide a valid token. Users shall not have passwords", async () => {
        const response = await client.get("/users").set("Authorization", `Bearer ${token}`).expect(200)
    
        expect(response.body[0].email).toBe("johndoe@gmail.com")
        expect(response.body[0].password).not.toBeDefined()
      })
    
      test("Should check that we cannot GET the list of users without a valid token", async () => {
        await client.get("/users").expect(401)
      })

   })

 