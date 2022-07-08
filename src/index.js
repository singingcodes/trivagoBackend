"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
const server_1 = require("./server");
const port = process.env.PORT || 3001;
if (process.env.MONGO_CONNECTION) {
    mongoose_1.default.connect(process.env.MONGO_CONNECTION);
}
else {
    throw new Error("No MONGO_CONNECTION environment variable found");
}
mongoose_1.default.connection.on("connected", () => {
    console.log("Connected to Mongo!");
    server_1.server.listen(port, () => {
        console.table((0, express_list_endpoints_1.default)(server_1.server));
    });
});
