import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.currentUser) return next(new NotAuthorizedError());

	next();
};
