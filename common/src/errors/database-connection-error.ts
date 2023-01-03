import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
	statusCode = 500;

	constructor() {
		super('Error connecting to database');
	}

	generateErrors() {
		return [{ message: 'Error connecting to database' }];
	}
}
