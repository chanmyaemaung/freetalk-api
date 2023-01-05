"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    images: [
        {
            src: {
                type: String,
                require: true,
            },
        },
    ],
    comments: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
}, {
    timestamps: true,
    versionKey: false,
});
PostSchema.statics.build = (createPostDto) => {
    return new Post(createPostDto);
};
const Post = mongoose_1.default.model('Post', PostSchema);
exports.default = Post;
