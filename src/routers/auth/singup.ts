import { Router, Request, Response, NextFunction } from 'express';
import { BadRequestError, validationRequest } from '../../../common';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import { body } from 'express-validator';

const router = Router();

router.post(
	'/signup',
	[
		body('email')
			.not()
			.isEmpty()
			.isEmail()
			.withMessage('Valid Email is required!'),

		body('password')
			.not()
			.isEmpty()
			.isLength({ min: 6 })
			.withMessage('Password must be at least 6 characters long!'),
	],
	validationRequest,
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (user) return new BadRequestError('Your email is already in use');

		const newUser = User.build({ email, password });

		await newUser.save();

		req.session = {
			jwt: jwt.sign(
				{ email, userId: newUser._id },
				process.env.JWT_KEY!,
				{ expiresIn: '10h' }
			),
		};

		res.status(201).json({ message: 'User created', newUser });
	}
);

export { router as signupRouter };
