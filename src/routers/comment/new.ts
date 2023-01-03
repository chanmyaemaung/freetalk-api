import { Router, Request, Response, NextFunction } from 'express';
import Comment from '../../models/Comment';
import Post from '../../models/Post';
import { BadRequestError } from '../../../common';

const router = Router();

router.post(
	'/api/comment/new/:postId',
	async (req: Request, res: Response, next: NextFunction) => {
		const { userName, content } = req.body;
		const { postId } = req.params;

		if (!content) {
			return next(new BadRequestError('Content is required!'));
		}

		const newComment = new Comment({
			userName: userName ? userName : 'Anonymous',
			content,
		});

		// !Save the new comment to the database
		await newComment.save();

		// !Push the new comment to the post
		const updatedPost = await Post.findOneAndUpdate(
			{ _id: postId },
			{ $push: { comments: newComment } },
			{ new: true }
		);

		res.status(201).send(updatedPost);
	}
);

export { router as newCommentRouter };
