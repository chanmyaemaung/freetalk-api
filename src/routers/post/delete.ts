import { Router, Request, Response, NextFunction } from 'express';
import Post from '../../models/Post';
import { BadRequestError } from '../../../common';

const router = Router();

router.delete(
	'/api/post/delete/:postId',
	async (req: Request, res: Response, next: NextFunction) => {
		const { postId } = req.params;

		if (!postId) {
			return next(new BadRequestError('Post ID is required!'));
		}

		try {
			await Post.findOneAndRemove({ _id: postId });
		} catch (error) {
			next(new Error('Post cannot be deleted!'));
		}

		res.status(200).json({ message: 'Post deleted successfully!' });
	}
);

export { router as deletePostRouter };
