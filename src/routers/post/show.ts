import { Router, Request, Response, NextFunction } from 'express';
import Post from '../../models/Post';

const router = Router();

router.get(
	'/api/post/show/:postId',
	async (req: Request, res: Response, next: NextFunction) => {
		const { postId } = req.params;

		if (!postId) {
			const allPosts = await Post.find({});
			res.status(200).send(allPosts);
		}

		const post = await Post.findOne({ _id: postId }).populate('comments');

		res.status(200).send(post);
	}
);

export { router as showPostRouter };
