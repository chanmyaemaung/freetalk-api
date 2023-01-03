import { Router, Request, Response, NextFunction } from 'express';
import { currentUser } from '../../../common';

const router = Router();

router.get(
	'/current-user',
	currentUser,
	(req: Request, res: Response, next: NextFunction) => {
		res.status(200).send({
			currentUser: req.currentUser || null,
		});
	}
);

export { router as currentUserRouter };
