import { Router, Request, Response, NextFunction } from 'express';
import User from '../../models/User';
import jwt from 'jsonwebtoken';
import { authenticationService, BadRequestError } from '../../../common';

const router = Router();

router.post(
	'/signin',
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (!user) return new BadRequestError('Wrong credentials!');

		const isMatch = await authenticationService.pwdCompare(
			user.password,
			password
		);

		if (!isMatch) return new BadRequestError('Wrong credentials!');

		const token = jwt.sign(
			{ id: user._id, email: user.email },
			process.env.JWT_KEY!,
			{ expiresIn: '10h' }
		);

		req.session = { jwt: token };

		res.status(200).json({ message: 'User logged in', user });
	}
);

export { router as signinRouter };
