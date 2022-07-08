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
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const model_1 = __importDefault(require("./model"));
const hosts_1 = require("../../auth/hosts");
const token_1 = require("../../auth/token");
const accommodationRouter = express_1.default.Router();
// POST WORKING!
accommodationRouter.post("/", token_1.JWTAuthMiddleware, hosts_1.hostOnlyMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPost = new model_1.default(req.body);
        const { _id } = yield newPost.save();
        res.status(201).send({ _id });
    }
    catch (error) {
        next(error);
    }
}));
//GET WORKING!
accommodationRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield model_1.default.find({});
        res.send(post);
    }
    catch (error) {
        next(error);
    }
}));
// WORKS
accommodationRouter.get("/:Id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield model_1.default.findById(req.params.Id);
        if (post) {
            res.send(post);
        }
        else {
            next((0, http_errors_1.default)(404, `Post with id ${req.params.Id} not found!`));
        }
    }
    catch (error) {
        next(error);
    }
}));
// Works!
accommodationRouter.put("/:Id", token_1.JWTAuthMiddleware, hosts_1.hostOnlyMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPost = yield model_1.default.findByIdAndUpdate(req.params.Id, req.body, { new: true, runValidators: true });
        if (updatedPost) {
            res.send(updatedPost);
        }
        else {
            next((0, http_errors_1.default)(404, `Post with id ${req.params.Id} not found!`));
        }
    }
    catch (error) {
        next(error);
    }
}));
// WORKS!
accommodationRouter.delete("/:postId", token_1.JWTAuthMiddleware, hosts_1.hostOnlyMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPost = yield model_1.default.findByIdAndDelete(req.params.postId);
        if (deletedPost) {
            res.status(204).send();
        }
        else {
            next((0, http_errors_1.default)(404, `User with id ${req.params.postId} not found!`));
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.default = accommodationRouter;
