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
exports.signupRouter = void 0;
const express_1 = require("express");
const common_1 = require("../../../common");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../models/User"));
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
exports.signupRouter = router;
router.post('/signup', [
    (0, express_validator_1.body)('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Valid Email is required!'),
    (0, express_validator_1.body)('password')
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long!'),
], common_1.validationRequest, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (user)
        return new common_1.BadRequestError('Your email is already in use');
    const newUser = User_1.default.build({ email, password });
    yield newUser.save();
    req.session = {
        jwt: jsonwebtoken_1.default.sign({ email, userId: newUser._id }, process.env.JWT_KEY, { expiresIn: '10h' }),
    };
    res.status(201).json({ message: 'User created', newUser });
}));
