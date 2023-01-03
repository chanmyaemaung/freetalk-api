import { Router, Request, Response, NextFunction } from 'express';
import Post from '../../models/Post';
import Comment from '../../models/Comment';

const router = Router();

router.delete(
	'/api/comment/:commentId/delete/:postId',
	async (req: Request, res: Response, next: NextFunction) => {
		const { postId, commentId } = req.params;

		if (!commentId || !postId) {
			const error = new Error(
				'Post ID and Comment ID are required!'
			) as CustomError;
			error.status = 400;
			return next(error);
		}

		try {
			await Comment.findOneAndRemove({ _id: commentId });
		} catch (error) {
			next(new Error('Comment cannot be deleted!'));
		}

		// !Pull the comment from the post and update the post
		await Post.findOneAndUpdate(
			{ _id: postId },
			{ $pull: { comments: commentId } }
		);

		res.status(200).json({ message: 'Comment deleted!' });
	}
);

export { router as deleteCommentRouter };
