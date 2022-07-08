"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAllHandler = exports.notFoundHandler = exports.forbiddenHandler = exports.unauthorizedHandler = void 0;
const unauthorizedHandler = (err, req, res, next) => {
    if (err.status === 401) {
        res.status(401).send({ message: err.message });
    }
    else {
        next(err);
    }
};
exports.unauthorizedHandler = unauthorizedHandler;
const forbiddenHandler = (err, req, res, next) => {
    if (err.status === 403) {
        res.status(403).send({ message: err.message });
    }
    else {
        next(err);
    }
};
exports.forbiddenHandler = forbiddenHandler;
const notFoundHandler = (err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).send({ message: err.message });
    }
    else {
        next(err);
    }
};
exports.notFoundHandler = notFoundHandler;
const catchAllHandler = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({
        message: "An error occurred on our side! We gonna fix that ASAP!",
    });
};
exports.catchAllHandler = catchAllHandler;
