import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';

import { authMiddleware } from '../../middleware/auth.middleware.js';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';

export const userRoute = Router({ caseSensitive: true, strict: true });

const userService = new UserService();
const userController = new UserController(userService);

userRoute.get('/getProfile', [authMiddleware], (req: Request, res: Response, next: NextFunction) => {
  userController.getProfile(req, res, next);
});

userRoute.get('/getIMs', [authMiddleware], (req: Request, res: Response, next: NextFunction) => {
  userController.getIMs(req, res, next);
});
