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
exports.signinRouter = void 0;
const express_1 = require("express");
const User_1 = __importDefault(require("../../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const common_1 = require("../../../common");
const router = (0, express_1.Router)();
exports.signinRouter = router;
router.post('/signin', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (!user)
        return new common_1.BadRequestError('Wrong credentials!');
    const isMatch = yield common_1.authenticationService.pwdCompare(user.password, password);
    if (!isMatch)
        return new common_1.BadRequestError('Wrong credentials!');
    const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_KEY, { expiresIn: '10h' });
    req.session = { jwt: token };
    res.status(200).json({ message: 'User logged in', user });
}));
