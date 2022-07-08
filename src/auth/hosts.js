"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hostOnlyMiddleware = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const hostOnlyMiddleware = (req, res, next) => {
    // This needs to be used AFTER the authentication middleware. It has only one job: checking the role of the current user
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === "host") {
        next();
    }
    else {
        next((0, http_errors_1.default)(403, "Host only endpoint!"));
    }
};
exports.hostOnlyMiddleware = hostOnlyMiddleware;
