import { Router, Request, Response, NextFunction } from 'express';
import Post from '../../models/Post';

const router = Router();

router.put(
	'/api/post/update/:postId',
	async (req: Request, res: Response, next: NextFunction) => {
		const { postId } = req.params;

		const { title, content } = req.body;

		if (!postId) {
			const error = new Error('Post ID is required!') as CustomError;
			error.status = 400;
			return next(error);
		}

		let updatedPost;

		try {
			updatedPost = await Post.findByIdAndUpdate(
				{ _id: postId },
				{ $set: { title, content } },
				{ new: true }
			);
		} catch (error) {
			const err = new Error('Post cannot be updated!') as CustomError;
			err.status = 400;
			return next(err);
		}

		res.status(200).json({
			message: 'Post updated successfully!',
			updatedPost,
		});
	}
);

export { router as updatePostRouter };
