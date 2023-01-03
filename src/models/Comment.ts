import mongoose from 'mongoose';

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

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
