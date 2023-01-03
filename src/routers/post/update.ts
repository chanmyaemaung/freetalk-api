import { Router, Request, Response, NextFunction } from 'express';
import Post from '../../models/Post';
import { BadRequestError } from '../../../common';

const router = Router();

router.put(
	'/api/post/update/:postId',
	async (req: Request, res: Response, next: NextFunction) => {
		const { postId } = req.params;

		const { title, content } = req.body;

		if (!postId) {
			return next(new BadRequestError('Post ID is required!'));
		}

		let updatedPost;

		try {
			updatedPost = await Post.findByIdAndUpdate(
				{ _id: postId },
				{ $set: { title, content } },
				{ new: true }
			);
		} catch (error) {
			return next(new Error('Post cannot be updated!'));
		}

		res.status(200).json({
			message: 'Post updated successfully!',
			updatedPost,
		});
	}
);

export { router as updatePostRouter };
