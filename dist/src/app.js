"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const common_1 = require("../common");
const routers_1 = require("./routers");
const app = (0, express_1.default)();
exports.app = app;
// !Middlewares
app.set('trust proxy', true);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false })); // *To use with front-end frameworks
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
}));
app.use((0, cookie_session_1.default)({
    signed: false,
    secure: false,
}));
app.use(common_1.currentUser);
// !Routes
app.use(common_1.requireAuth, routers_1.newPostRouter);
app.use(common_1.requireAuth, routers_1.deletePostRouter);
app.use(common_1.requireAuth, routers_1.updatePostRouter);
app.use(common_1.requireAuth, routers_1.addImagesRouter);
app.use(common_1.requireAuth, routers_1.deleteImagesRouter);
app.use(routers_1.showPostRouter);
app.use(common_1.requireAuth, routers_1.newCommentRouter);
app.use(common_1.requireAuth, routers_1.deleteCommentRouter);
app.all('*', (req, res, next) => {
    return next(new common_1.NotFoundError());
});
app.use(common_1.errorHandler);
