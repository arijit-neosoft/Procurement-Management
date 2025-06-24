import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Roles } from '../../decorator/roles.decorator.js';
import { AppException } from '../../lib/appException.lib.js';
import { AppResponse } from '../../lib/appResponse.lib.js';
import { Role } from '../../model/user.model.js';
import { createOrderInputSchema } from './dto/createOrder.input.js';
import type { OrderService } from './order.service.js';

export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Roles(Role.PROCUREMENT_MANAGER)
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const validationResult = createOrderInputSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new AppException('createOrder validation failed', httpStatus.BAD_REQUEST, validationResult.error);
      }

      const serviceResponse = await this.orderService.createOrder(validationResult.data);

      AppResponse.responseHandler({
        res: res,
        statusCode: httpStatus.OK,
        responseType: serviceResponse,
      });
    } catch (error) {
      next(error);
    }
  }
}
