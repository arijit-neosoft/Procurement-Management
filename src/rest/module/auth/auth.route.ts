import { type NextFunction, type Request, type Response, Router } from 'express';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

export const authRoute = Router({ caseSensitive: true, strict: true });

const authService = new AuthService();
const authController = new AuthController(authService);

authRoute.post('/signupAdmin', [], (req: Request, res: Response, next: NextFunction) => {
  authController.signupAdmin(req, res, next);
});
