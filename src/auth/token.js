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
exports.JWTAuthMiddleware = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const tools_1 = require("./tools");
const JWTAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        next((0, http_errors_1.default)(401, "Please provide Bearer Token in the authorization header!"));
    }
    else {
        try {
            const token = req.headers.authorization.replace("Bearer ", "");
            const payload = yield (0, tools_1.verifyAccessToken)(token);
            if (payload) {
                req.user = {
                    _id: payload._id,
                    role: payload.role,
                };
                next();
            }
            else {
                console.log(" no payload");
            }
        }
        catch (error) {
            console.log(error);
            next((0, http_errors_1.default)(401, "Token not valid!"));
        }
    }
});
exports.JWTAuthMiddleware = JWTAuthMiddleware;
