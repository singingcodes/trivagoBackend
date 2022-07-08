"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorHandlers_1 = require("./errorHandlers");
const index_1 = __importDefault(require("./apis/users/index"));
const index_2 = __importDefault(require("./apis/accommodation/index"));
const passport_1 = __importDefault(require("passport"));
//import googleStrategy from "./auth/googleOAuth"
// import facebookStrategy from "./auth/facebookOAuth.js"
const server = (0, express_1.default)();
exports.server = server;
//passport.use("google", googleStrategy)
// passport.use("facebook", facebookStrategy)
// ************************************** MIDDLEWARES *****************************************
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use(passport_1.default.initialize());
// ************************************** ENDPOINTS *******************************************
server.use("/users", index_1.default);
server.use("/accommodation", index_2.default);
// ************************************* ERROR HANDLERS ***************************************
server.use(errorHandlers_1.unauthorizedHandler);
server.use(errorHandlers_1.forbiddenHandler);
server.use(errorHandlers_1.catchAllHandler);
server.use(errorHandlers_1.notFoundHandler);
