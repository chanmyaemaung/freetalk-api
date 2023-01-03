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
exports.newCommentRouter = void 0;
const express_1 = require("express");
const Comment_1 = __importDefault(require("../../models/Comment"));
const Post_1 = __importDefault(require("../../models/Post"));
const router = (0, express_1.Router)();
exports.newCommentRouter = router;
router.post('/api/comment/new/:postId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, content } = req.body;
    const { postId } = req.params;
    if (!content) {
        const error = new Error('Content are required!');
        error.status = 400;
        return next(error);
    }
    const newComment = new Comment_1.default({
        userName: userName ? userName : 'Anonymous',
        content,
    });
    // !Save the new comment to the database
    yield newComment.save();
    // !Push the new comment to the post
    const updatedPost = yield Post_1.default.findOneAndUpdate({ _id: postId }, { $push: { comments: newComment } }, { new: true });
    res.status(201).send(updatedPost);
}));
