import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
	statusCode = 404;

	constructor() {
		super('Route not found');
	}

	generateErrors() {
		return [{ message: 'Not Found' }];
	}
}
