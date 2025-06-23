import httpStatus from 'http-status';
import type { IServiceResponse } from '../../interface/appResponse.interface.js';
import { AppException } from '../../lib/appException.lib.js';
import type { IUser } from '../../model/user.model.js';

export class UserService {
  async getProfile(user: IUser): Promise<IServiceResponse> {
    try {
      return {
        success: true,
        message: 'getProfile success',
        data: { ...user },
      };
    } catch (error) {
      AppException.exceptionHandler(error, 'getProfile failed', httpStatus.INTERNAL_SERVER_ERROR, {});
      throw error;
    }
  }
}
