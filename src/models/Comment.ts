import mongoose from 'mongoose';

export interface CommentDoc extends mongoose.Document {
	userName: string;
	content: string;
}

export interface createCommentDto {
	userName: string;
	content: string;
}

export interface CommentModel extends mongoose.Model<CommentDoc> {
	build(createCommentDto: createCommentDto): CommentDoc;
}

const CommentSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
		},
		content: {
			type: String,
			require: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

CommentSchema.statics.build = (createCommentDto: createCommentDto) => {
	return new Comment(createCommentDto);
};

const Comment = mongoose.model<CommentDoc, CommentModel>(
	'Comment',
	CommentSchema
);

export default Comment;
