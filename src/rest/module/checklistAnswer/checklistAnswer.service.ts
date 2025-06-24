import httpStatus from 'http-status';
import { _model } from '../../_model.js';
import type { IServiceResponse } from '../../interface/appResponse.interface.js';
import { AppException } from '../../lib/appException.lib.js';
import type { IChecklist } from '../../model/checklist.model.js';
import { OrderStatus } from '../../model/order.model.js';

export class ChecklistAnswerService {
  async createChecklistAnswer(body: any): Promise<IServiceResponse> {
    try {
      const { orderId, userId, answers } = body;

      const order = await _model.orderModel.findById(orderId).populate('checklist');

      if (!order) {
        throw new AppException('Order not found', httpStatus.NOT_FOUND, {});
      }

      const checklist = order.checklist as unknown as IChecklist;

      if (!checklist) {
        throw new AppException('Checklist not attached to this order', httpStatus.BAD_REQUEST, {});
      }

      if (order.checklistAnswer) {
        throw new AppException('Checklist already submitted for this order', httpStatus.BAD_REQUEST, {});
      }

      for (const question of checklist.questions) {
        const answer = answers.find((a: { questionId: string }) => a.questionId === question._id.toString());

        if (question.required && (!answer || answer.value === null || answer.value === undefined || answer.value === '')) {
          throw new AppException(`Missing required answer for: ${question.questionText}`, httpStatus.BAD_REQUEST, {});
        }

        if (answer) {
          const val = answer.value;

          switch (question.type) {
            case 'BOOLEAN':
              if (typeof val !== 'boolean') {
                throw new AppException(`Expected boolean for: ${question.questionText}`, httpStatus.BAD_REQUEST, {});
              }
              break;

            case 'DROPDOWN':
              if (!question?.options?.includes(val as string)) {
                throw new AppException(`Invalid dropdown value for: ${question.questionText}`, httpStatus.BAD_REQUEST, {});
              }
              break;

            case 'MULTIPLE_CHOICE':
              if (!Array.isArray(val)) {
                throw new AppException(`Expected array for: ${question.questionText}`, httpStatus.BAD_REQUEST, {});
              }
              for (const v of val) {
                if (!question?.options?.includes(v)) {
                  throw new AppException(`Invalid option "${v}" for: ${question.questionText}`, httpStatus.BAD_REQUEST, {});
                }
              }
              break;

            case 'TEXT':
              if (typeof val !== 'string') {
                throw new AppException(`Expected text for: ${question.questionText}`, httpStatus.BAD_REQUEST, {});
              }
              break;

            case 'FILE':
              if (typeof val !== 'string' || !val.startsWith('http')) {
                throw new AppException(`Expected valid file URL for: ${question.questionText}`, httpStatus.BAD_REQUEST, {});
              }
              break;

            default:
              throw new AppException(`Unsupported question type: ${question.type}`, httpStatus.BAD_REQUEST, {});
          }
        }
      }

      // Save the checklist answer
      const created = await _model.checklistAnswerModel.create({
        order: order._id,
        checklist: checklist,
        answers,
        createdBy: userId,
      });

      // Update order
      await _model.orderModel.updateOne(
        {
          _id: order._id,
        },
        {
          checklistAnswer: created._id,
          orderStatus: OrderStatus.INSPECTION_DONE,
        }
      );

      return { success: true, message: 'createChecklistAnswer success', data: created };
    } catch (error) {
      AppException.exceptionHandler(error, 'createChecklistAnswer failed', httpStatus.INTERNAL_SERVER_ERROR, {});
      throw error;
    }
  }
}
