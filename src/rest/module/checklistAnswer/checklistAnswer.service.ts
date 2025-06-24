import httpStatus from 'http-status';
import type { IServiceResponse } from '../../interface/appResponse.interface.js';
import { AppException } from '../../lib/appException.lib.js';

export class ChecklistAnswerService {
  async createChecklistAnswer(): Promise<IServiceResponse> {
    try {
      return { success: true, message: 'createChecklistAnswer success', data: {} };
    } catch (error) {
      AppException.exceptionHandler(error, 'createChecklistAnswer failed', httpStatus.INTERNAL_SERVER_ERROR, {});
      throw error;
    }
  }
}
