import * as dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieSession from 'cookie-session';
import { currentUser, requireAuth } from '../common';
import {
	newPostRouter,
	deletePostRouter,
	updatePostRouter,
	showPostRouter,
	newCommentRouter,
	deleteCommentRouter,
} from './routers';

// !Mongoose options - to avoid deprecation warnings
mongoose.set('strictQuery', false);

const app = express();

const port = process.env.PORT || 8080;

// !Middlewares
app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // *To use with front-end frameworks
app.use(
	cors({
		origin: 'http://localhost:3000',
		optionsSuccessStatus: 200,
	})
);
app.use(
	cookieSession({
		signed: false,
		secure: false,
	})
);
app.use(currentUser);

// !Error handling middleware
app.use(
	(error: CustomError, req: Request, res: Response, next: NextFunction) => {
		if (error.status) {
			return res.status(error.status).json({ message: error.message });
		}

		res.status(500).json({ message: 'Something went wrong!' });
	}
);

// !Routes
app.use(requireAuth, newPostRouter);
app.use(requireAuth, deletePostRouter);
app.use(requireAuth, updatePostRouter);
app.use(showPostRouter);

app.use(requireAuth, newCommentRouter);
app.use(requireAuth, deleteCommentRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
	const error = new Error('Route not found!') as CustomError;
	error.status = 404;
	next(error);
});

// !Custom Global Typescript Interfaces
declare global {
	interface CustomError extends Error {
		status?: number;
	}
}

const start = async () => {
	if (!process.env.MONGO_URI) throw new Error('MONGO_URI must be defined!');
	if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined!');

	try {
		await mongoose.connect(process.env.MONGO_URI, {});
	} catch (error) {
		throw new Error('Error connecting to database!');
	}

	app.listen(port, () =>
		console.log(`Server is running on port http://localhost:${port}`)
	);
};

// !Start the server
start();
