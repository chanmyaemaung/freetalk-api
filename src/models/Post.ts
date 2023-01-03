import mongoose from 'mongoose';
import { CommentDoc } from './Comment';

export interface PostDoc extends mongoose.Document {
	title: string;
	content: string;
	comments?: Array<CommentDoc>;
}

export interface createPostDto {
	title: string;
	content: string;
}

export interface PostModel extends mongoose.Model<PostDoc> {
	build(createPostDto: createPostDto): PostDoc;
}

const PostSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			require: true,
		},
		content: {
			type: String,
			require: true,
		},
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

PostSchema.statics.build = (createPostDto: createPostDto) => {
	return new Post(createPostDto);
};

const Post = mongoose.model<PostDoc, PostModel>('Post', PostSchema);

export default Post;
