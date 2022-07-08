"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = require("../src/server");
const model_1 = __importDefault(require("../src/apis/users/model"));
dotenv_1.default.config();
const client = (0, supertest_1.default)(server_1.server);
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // Before all hook could be used to connect to mongo and also do some initial setup (like inserting some mock data)
    yield mongoose_1.default.connect(process.env.MONGO_TESTDB_URL); // DO NOT FORGET TO CONNECT TO MONGO! OTHERWISE YOU GONNA GET SOME TIMEOUT ERRORS
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield model_1.default.deleteMany();
    yield mongoose_1.default.connection.close();
}));
const validUser = {
    email: "johndoe@gmail.com",
    password: "123456",
    role: "guest",
    googleID: "123456789",
};
const invalidUser = {
    email: "",
    password: "",
    role: "",
    googleID: "",
};
let token;
describe("Tests users' endpoints", () => {
    test("Should check that when POST /users/register it returns 201 and a valid _id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield client.post("/users/register").send(validUser).expect(201);
        expect(response.body).toHaveProperty("_id");
    }));
    test("Should check that we can login using POST /users/login with a valid user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield client.post("/users/login").send(validUser).expect(200);
        expect(response.body).toHaveProperty("accessToken");
        token = response.body.accessToken;
    }));
    test("Should check that we cannot login using POST /users/login with wrong credentials", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.post("/users/login").send(invalidUser).expect(401);
    }));
    test("Should check that GET /users returns users if you provide a valid token. Users shall not have passwords", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield client.get("/users").set("Authorization", `Bearer ${token}`).expect(200);
        expect(response.body[0].name).toBe("Alice");
        expect(response.body[0].password).not.toBeDefined();
    }));
    test("Should check that we cannot GET the list of users without a valid token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.get("/users").expect(401);
    }));
});
