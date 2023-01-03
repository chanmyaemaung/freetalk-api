import { Router, Request, Response, NextFunction } from 'express';
import Post from '../../models/Post';

const router = Router();

router.delete(
	'/api/post/delete/:postId',
	async (req: Request, res: Response, next: NextFunction) => {
		const { postId } = req.params;

		if (!postId) {
			const error = new Error('Post ID is required!') as CustomError;
			error.status = 400;
			return next(error);
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
