import { Router, Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../../common';
import jwt from 'jsonwebtoken';
import User from '../../models/User';

const router = Router();

router.post(
	'/signup',
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (user) return new BadRequestError('Your email is already in use');

		const newUser = new User({ email, password });

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
