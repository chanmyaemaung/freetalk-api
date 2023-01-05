import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
	interface JwtPayload {
		email: string;
		userId: string;
	}

	namespace Express {
		interface Request {
			currentUser?: JwtPayload;
		}
	}
}

export const currentUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.session?.jwt) return next();

	try {
		const payload = jwt.verify(
			req.session?.jwt,
			process.env.JWT_KEY!
		) as JwtPayload;

		req.currentUser = payload;
	} catch (error) {
		return next();
	}

	next();
};
