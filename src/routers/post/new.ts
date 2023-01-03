import { Router, Request, Response, NextFunction } from 'express';
import Post from '../../models/Post';

const router = Router();

router.post(
	'/api/post/new',
	async (req: Request, res: Response, next: NextFunction) => {
		const { title, content } = req.body;

		if (!title || !content) {
			const error = new Error(
				'Title and content are required!'
			) as CustomError;

			error.status = 400;
			return next(error);
		}

		const newPost = new Post({
			title,
			content,
		});

		await newPost.save();

		res.status(201).json({
			message: 'Post created successfully!',
			newPost,
		});
	}
);

export { router as newPostRouter };
