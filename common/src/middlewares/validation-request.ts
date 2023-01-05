import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validator-error';
import { validationResult } from 'express-validator';

export const validationRequest = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);

	if (errors.isEmpty()) {
		return next(new RequestValidationError(errors.array()));
	}

	next();
};
