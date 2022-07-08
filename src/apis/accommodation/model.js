"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const accommodationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    maxGuests: {
        type: Number,
    },
    city: {
        type: String,
    },
    /*     googleID: { type: String }, */
    host: [{ type: Schema.Types.ObjectId, ref: "User" }],
}, {
    timestamps: true,
});
exports.default = model("Accommodation", accommodationSchema);
