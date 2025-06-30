import httpStatus from 'http-status';
import { _model } from '../../_model.js';
import type { IServiceResponse } from '../../interface/appResponse.interface.js';
import { AppException } from '../../lib/appException.lib.js';
import type { ICreateOrderInput } from './dto/createOrder.input.js';
import type { ILinkOrderWithChecklistInput } from './dto/linkOrderAndChecklist.input.js';
import type { IUpdateOrderStatusInput } from './dto/updateOrderStatusInput.input.js';
import { IGetOrderByIdInput } from './dto/getOrderById.input.js';

export class OrderService {
  async createOrder(createOrderInput: ICreateOrderInput): Promise<IServiceResponse> {
    try {
      const existingOrder = await _model.orderModel.findOne({
        name: createOrderInput.name,
        client: createOrderInput.clientId,
      });

      if (existingOrder) {
        throw new AppException('Order with the same name and client already exists', httpStatus.BAD_REQUEST, {});
      }

      const order = await _model.orderModel.create({
        name: createOrderInput.name,
        description: createOrderInput.description,
        client: createOrderInput.clientId,
        procurementManager: createOrderInput.procurementManagerId,
        inspectionManager: createOrderInput.inspectionManagerId,
        checklist: createOrderInput.checklistId,
        checklistAnswer: createOrderInput.checklistAnswerId,
        orderStatus: createOrderInput.orderStatus,
      });

      return { success: true, message: 'createOrder success', data: order };
    } catch (error) {
      AppException.exceptionHandler(error, 'createOrder failed', httpStatus.INTERNAL_SERVER_ERROR, {});
      throw error;
    }
  }

  async getOrderById(getOrderByIdInput: IGetOrderByIdInput): Promise<IServiceResponse> {
    try {
      const { orderId } = getOrderByIdInput;

      const order = await _model.orderModel
        .findById(orderId)
        .populate('client')
        .populate('procurementManager')
        .populate('inspectionManager')
        .populate('checklist')
        .populate('checklistAnswer');

      if (!order) {
        throw new AppException('Order not found', httpStatus.NOT_FOUND, {});
      }

      return {
        success: true,
        message: 'getOrderById success',
        data: order,
      };
    } catch (error) {
      AppException.exceptionHandler(error, 'getOrderById failed', httpStatus.INTERNAL_SERVER_ERROR, {});
      throw error;
    }
  }

  async updateOrderStatus(updateOrderStatusInput: IUpdateOrderStatusInput): Promise<IServiceResponse> {
    try {
      const { orderId, orderStatus } = updateOrderStatusInput;

      const order = await _model.orderModel.findByIdAndUpdate(orderId, { orderStatus }, { new: true });

      if (!order) {
        throw new AppException('Order not found', httpStatus.NOT_FOUND, {});
      }

      return { success: true, message: 'updateOrderStatus success', data: order };
    } catch (error) {
      AppException.exceptionHandler(error, 'updateOrderStatus failed', httpStatus.INTERNAL_SERVER_ERROR, {});
      throw error;
    }
  }

  async linkOrderWithChecklist(linkOrderWithChecklistInput: ILinkOrderWithChecklistInput): Promise<IServiceResponse> {
    try {
      const existingOrder = await _model.orderModel.findOne({ _id: linkOrderWithChecklistInput.orderId });
      if (!existingOrder) {
        throw new AppException('Order not found', httpStatus.NOT_FOUND, {});
      }

      const existingChecklist = await _model.checklistModel.findOne({ _id: linkOrderWithChecklistInput.checklistId });
      if (!existingChecklist) {
        throw new AppException('Checklist not found', httpStatus.NOT_FOUND, {});
      }

      if (existingOrder.client.toString() !== existingChecklist.client.toString()) {
        throw new AppException('Order and checklist must belong to the same client', httpStatus.BAD_REQUEST, {});
      }

      const order = await _model.orderModel.updateOne(
        {
          _id: linkOrderWithChecklistInput.orderId,
        },
        {
          checklist: linkOrderWithChecklistInput.checklistId,
        }
      );

      return { success: true, message: 'linkOrderAndChecklist success', data: order };
    } catch (error) {
      AppException.exceptionHandler(error, 'linkOrderAndChecklist failed', httpStatus.INTERNAL_SERVER_ERROR, {});
      throw error;
    }
  }
}
