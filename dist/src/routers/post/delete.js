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
exports.deletePostRouter = void 0;
const express_1 = require("express");
const Post_1 = __importDefault(require("../../models/Post"));
const User_1 = __importDefault(require("../../models/User"));
const common_1 = require("../../../common");
const router = (0, express_1.Router)();
exports.deletePostRouter = router;
router.delete('/api/post/delete/:postId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    if (!postId) {
        return next(new common_1.BadRequestError('Post ID is required!'));
    }
    try {
        yield Post_1.default.findOneAndRemove({ _id: postId });
    }
    catch (error) {
        next(new Error('Post cannot be deleted!'));
    }
    const user = yield User_1.default.findOneAndUpdate({ _id: req.currentUser.userId }, { $pull: { posts: postId } }, { new: true });
    if (!user)
        return next(new Error());
    res.status(200).json({ message: 'Post deleted successfully!', user });
}));
