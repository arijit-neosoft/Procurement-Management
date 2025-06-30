import httpStatus from 'http-status';

import { _model } from '../../_model.js';
import type { IServiceResponse } from '../../interface/appResponse.interface.js';
import { AppException } from '../../lib/appException.lib.js';
import { type IUser, Role } from '../../model/user.model.js';

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

  async getIMs(user: IUser): Promise<IServiceResponse> {
    try {
      if (user.role === Role.ADMIN) {
        const imList = await _model.userModel.find({
          role: Role.INSPECTION_MANAGER,
        });

        return {
          success: true,
          message: 'getIMs success',
          data: imList,
        };
      }

      if (user.role === Role.PROCUREMENT_MANAGER) {
        const imList = await _model.userModel.find({
          role: Role.INSPECTION_MANAGER,
          parent: user._id,
        });

        return {
          success: true,
          message: 'getIMs success',
          data: imList,
        };
      }

      return { success: false, message: 'NO USER', data: {} };
    } catch (error) {
      AppException.exceptionHandler(error, 'getIMs failed', httpStatus.INTERNAL_SERVER_ERROR, {});
      throw error;
    }
  }
}
