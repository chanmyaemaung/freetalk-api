import { Router, Request, Response, NextFunction } from 'express';
import Post from '../../models/Post';

const router = Router();

router.post(
	'/post/:postId/delete/images',
	async (req: Request, res: Response, next: NextFunction) => {
		const { postId } = req.params;
		const { imagesId } = req.body;

		const post = await Post.findOneAndUpdate(
			{ _id: postId },
			{ $pull: { images: { _id: { $in: imagesId } } } },
			{ new: true }
		);

		res.status(200).send(post);
	}
);

export { router as deleteImagesRouter };
