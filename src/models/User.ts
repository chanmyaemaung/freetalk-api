import { authenticationService } from '../../common';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		posts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Post',
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

UserSchema.pre('save', async function (done) {
	if (this.isModified('password') || this.isNew) {
		const hashedPassword = authenticationService.pwdToHash(
			this.get('password')
		);
		this.set('password', hashedPassword);
	}

	done();
});

const User = mongoose.model('User', UserSchema);

export default User;
