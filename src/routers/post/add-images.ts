import { Router, Request, Response, NextFunction } from 'express';
import { BadRequestError, uploadImages } from '../../../common';
import Post from '../../models/Post';
import fs from 'fs';
import path from 'path';

const router = Router();

router.post(
	'/post/:postId/add/images',
	uploadImages,
	async (req: Request, res: Response, next: NextFunction) => {
		const { postId } = req.params;

		// !Handle image upload
		if (!req.files) return next(new BadRequestError('No images uploaded!'));

		let images: Array<Express.Multer.File>;

		if (typeof req.files === 'object') {
			images = Object.values(req.files);
		} else {
			images = req.files ? [...req.files] : [];
		}

		const imagesArray = images.map((file: Express.Multer.File) => {
			let srcObj = {
				src: `data:${file.mimetype};base64,${fs
					.readFileSync(path.join('/uploads') + file.filename)
					.toString('base64')}}`,
			};

			// !Delete the file from the uploads folder
			fs.unlink(path.join('/uploads' + file.filename), () => {});

			return srcObj;
		});

		const post = await Post.findOneAndUpdate(
			{ _id: postId },
			{ $push: { images: { $each: imagesArray } } },
			{ new: true }
		);

		res.status(200).send(post);
	}
);

export { router as addImagesRouter };
