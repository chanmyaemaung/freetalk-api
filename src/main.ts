import mongoose from 'mongoose';
import { app } from './app';
const port = process.env.PORT || 8080;

// !Mongoose options - to avoid deprecation warnings
mongoose.set('strictQuery', false);

const start = async () => {
	if (!process.env.MONGO_URI) throw new Error('MONGO_URI must be defined!');
	if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined!');

	try {
		await mongoose.connect(process.env.MONGO_URI, {});
	} catch (error) {
		throw new Error('Error connecting to database!');
	}

	app.listen(port, () =>
		console.log(`Server is running on port http://localhost:${port}`)
	);
};

// !Start the server
start();
