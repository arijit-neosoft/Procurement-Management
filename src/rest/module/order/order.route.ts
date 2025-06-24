import { type NextFunction, type Request, type Response, Router } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { OrderController } from './order.controller.js';
import { OrderService } from './order.service.js';

export const orderRoute = Router({ caseSensitive: true, strict: true });

const orderService = new OrderService();
const orderController = new OrderController(orderService);

orderRoute.post('/createOrder', [authMiddleware], (req: Request, res: Response, next: NextFunction) => {
  orderController.createOrder(req, res, next);
});
