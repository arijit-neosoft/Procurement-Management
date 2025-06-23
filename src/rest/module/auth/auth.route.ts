import { type NextFunction, type Request, type Response, Router } from 'express';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

export const authRoute = Router({ caseSensitive: true, strict: true });

const authService = new AuthService();
const authController = new AuthController(authService);

authRoute.post('/signupAdmin', [], (req: Request, res: Response, next: NextFunction) => {
  authController.signupAdmin(req, res, next);
});

authRoute.get('/verifyLink', [], (req: Request, res: Response, next: NextFunction) => {
  authController.verifyLink(req, res, next);
});

authRoute.patch('/verify', [], (req: Request, res: Response, next: NextFunction) => {
  authController.verify(req, res, next);
});

authRoute.get('/signin', [], (req: Request, res: Response, next: NextFunction) => {
  authController.signin(req, res, next);
});

authRoute.post('/createUsersByAdmin', [], (req: Request, res: Response, next: NextFunction) => {
  authController.createUsersByAdmin(req, res, next);
});
