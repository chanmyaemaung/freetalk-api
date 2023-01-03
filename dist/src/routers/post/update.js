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
exports.updatePostRouter = void 0;
const express_1 = require("express");
const Post_1 = __importDefault(require("../../models/Post"));
const router = (0, express_1.Router)();
exports.updatePostRouter = router;
router.put('/api/post/update/:postId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    const { title, content } = req.body;
    if (!postId) {
        const error = new Error('Post ID is required!');
        error.status = 400;
        return next(error);
    }
    let updatedPost;
    try {
        updatedPost = yield Post_1.default.findByIdAndUpdate({ _id: postId }, { $set: { title, content } }, { new: true });
    }
    catch (error) {
        const err = new Error('Post cannot be updated!');
        err.status = 400;
        return next(err);
    }
    res.status(200).json({
        message: 'Post updated successfully!',
        updatedPost,
    });
}));
