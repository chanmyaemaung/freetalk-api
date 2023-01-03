"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CommentSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
    },
    content: {
        type: String,
        require: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
const Comment = mongoose_1.default.model('Comment', CommentSchema);
exports.default = Comment;
