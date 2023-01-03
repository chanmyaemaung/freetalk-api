import { authenticationService } from '../../common';
import mongoose from 'mongoose';
import { PostDoc } from './Post';

export interface UserDoc extends mongoose.Document {
	email: string;
	password: string;
	posts?: Array<PostDoc>;
}

export interface createUserDto {
	email: string;
	password: string;
}

export interface UserModel extends mongoose.Model<UserDoc> {
	build(createUserDto: createUserDto): UserDoc;
}

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

UserSchema.statics.build = (createUserDto: createUserDto) => {
	return new User(createUserDto);
};

const User = mongoose.model<UserDoc, UserModel>('User', UserSchema);

export default User;
