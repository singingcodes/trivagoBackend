"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.generateAccessTokenForGoogle = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (payload) => new Promise((resolve, reject) => jsonwebtoken_1.default.sign(payload /* .toJSON() */, process.env.JWT_SECRET, { expiresIn: "1 week" }, (err, token) => {
    if (err)
        reject(err);
    else
        resolve(token);
}));
exports.generateAccessToken = generateAccessToken;
const generateAccessTokenForGoogle = (payload) => new Promise((resolve, reject) => jsonwebtoken_1.default.sign(payload /* .toJSON() */, process.env.JWT_SECRET, { expiresIn: "1 week" }, (err, token) => {
    if (err)
        reject(err);
    else
        resolve(token);
}));
exports.generateAccessTokenForGoogle = generateAccessTokenForGoogle;
const verifyAccessToken = (token) => new Promise((res, rej) => jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err)
        rej(err);
    else
        res(payload);
}));
exports.verifyAccessToken = verifyAccessToken;
