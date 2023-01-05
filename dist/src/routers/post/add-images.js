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
exports.addImagesRouter = void 0;
const express_1 = require("express");
const common_1 = require("../../../common");
const Post_1 = __importDefault(require("../../models/Post"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
exports.addImagesRouter = router;
router.post('/post/:postId/add/images', common_1.uploadImages, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    // !Handle image upload
    if (!req.files)
        return next(new common_1.BadRequestError('No images uploaded!'));
    let images;
    if (typeof req.files === 'object') {
        images = Object.values(req.files);
    }
    else {
        images = req.files ? [...req.files] : [];
    }
    const imagesArray = images.map((file) => {
        let srcObj = {
            src: `data:${file.mimetype};base64,${fs_1.default
                .readFileSync(path_1.default.join('/uploads') + file.filename)
                .toString('base64')}}`,
        };
        // !Delete the file from the uploads folder
        fs_1.default.unlink(path_1.default.join('/uploads' + file.filename), () => { });
        return srcObj;
    });
    const post = yield Post_1.default.findOneAndUpdate({ _id: postId }, { $push: { images: { $each: imagesArray } } }, { new: true });
    res.status(200).send(post);
}));
