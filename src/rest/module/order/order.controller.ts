import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { Roles } from '../../decorator/roles.decorator.js';
import { AppException } from '../../lib/appException.lib.js';
import { AppResponse } from '../../lib/appResponse.lib.js';
import { Role } from '../../model/user.model.js';
import { createOrderInputSchema } from './dto/createOrder.input.js';
import { getOrderByIdInputSchema } from './dto/getOrderById.input.js';
import { linkOrderWithChecklistInputSchema } from './dto/linkOrderAndChecklist.input.js';
import { updateOrderStatusInputSchema } from './dto/updateOrderStatusInput.input.js';
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

      AppResponse.responseHandler({ res: res, statusCode: httpStatus.OK, responseType: serviceResponse });
    } catch (error) {
      next(error);
    }
  }

  @Roles(Role.ADMIN, Role.PROCUREMENT_MANAGER, Role.INSPECTION_MANAGER, Role.CLIENT)
  async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const validationResult = getOrderByIdInputSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new AppException('createOrder validation failed', httpStatus.BAD_REQUEST, validationResult.error);
      }

      const serviceResponse = await this.orderService.getOrderById(validationResult.data);

      AppResponse.responseHandler({ res: res, statusCode: httpStatus.OK, responseType: serviceResponse });
    } catch (error) {
      next(error);
    }
  }

  @Roles(Role.ADMIN, Role.PROCUREMENT_MANAGER, Role.INSPECTION_MANAGER)
  async updateOrderStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const validationResult = updateOrderStatusInputSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new AppException('updateOrderStatus validation failed', httpStatus.BAD_REQUEST, validationResult.error);
      }

      const serviceResponse = await this.orderService.updateOrderStatus(validationResult.data);

      AppResponse.responseHandler({ res: res, statusCode: httpStatus.OK, responseType: serviceResponse });
    } catch (error) {
      next(error);
    }
  }

  @Roles(Role.PROCUREMENT_MANAGER)
  async linkOrderWithChecklist(req: Request, res: Response, next: NextFunction) {
    try {
      const validationResult = linkOrderWithChecklistInputSchema.safeParse(req.body);

      if (!validationResult.success) {
        throw new AppException('linkOrderWithChecklist validation failed', httpStatus.BAD_REQUEST, validationResult.error);
      }

      const serviceResponse = await this.orderService.linkOrderWithChecklist(validationResult.data);

      AppResponse.responseHandler({ res: res, statusCode: httpStatus.OK, responseType: serviceResponse });
    } catch (error) {
      next(error);
    }
  }
}
