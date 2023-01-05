import * as dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import {
	currentUser,
	errorHandler,
	NotFoundError,
	requireAuth,
} from '../common';
import {
	newPostRouter,
	deletePostRouter,
	updatePostRouter,
	showPostRouter,
	addImagesRouter,
	deleteImagesRouter,
	newCommentRouter,
	deleteCommentRouter,
} from './routers';

const app = express();

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

// !Routes
app.use(requireAuth, newPostRouter);
app.use(requireAuth, deletePostRouter);
app.use(requireAuth, updatePostRouter);
app.use(requireAuth, addImagesRouter);
app.use(requireAuth, deleteImagesRouter);
app.use(showPostRouter);

app.use(requireAuth, newCommentRouter);
app.use(requireAuth, deleteCommentRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
	return next(new NotFoundError());
});

app.use(errorHandler);

export { app };
