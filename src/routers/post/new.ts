import { Router, Request, Response, NextFunction } from 'express';
import Post from '../../models/Post';
import User from '../../models/User';
import { BadRequestError, uploadImages } from '../../../common';
import fs from 'fs';
import path from 'path';

const router = Router();

router.post(
	'/api/post/new',
	uploadImages,
	async (req: Request, res: Response, next: NextFunction) => {
		const { title, content } = req.body;

		// !Handle image upload
		if (!req.files) return next(new BadRequestError('No images uploaded!'));

		let images: Array<Express.Multer.File>;

		if (typeof req.files === 'object') {
			images = Object.values(req.files);
		} else {
			images = req.files ? [...req.files] : [];
		}

		if (!title || !content) {
			return next(new BadRequestError('Title and content are required!'));
		}

		const newPost = Post.build({
			title,
			content,
			images: images.map((file: Express.Multer.File) => {
				let srcObj = {
					src: `data:${file.mimetype};base64,${fs
						.readFileSync(path.join('/uploads') + file.filename)
						.toString('base64')}}`,
				};

				// !Delete the file from the uploads folder
				fs.unlink(path.join('/uploads' + file.filename), () => {});

				return srcObj;
			}),
		});

		await newPost.save();

		await User.findOneAndUpdate(
			{ _id: req.currentUser!.userId },
			{ $push: { posts: newPost._id } }
		);

		res.status(201).json({
			message: 'Post created successfully!',
			newPost,
		});
	}
);

export { router as newPostRouter };
