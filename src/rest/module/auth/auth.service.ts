import httpStatus from 'http-status';
import { _model } from '../../_model.js';
import type { IServiceResponse } from '../../interface/AppResponse.interface.js';
import { AppException } from '../../lib/appException.lib.js';
import type { ISignUpAdminInput } from './dto/signupAdmin.input.js';

export class AuthService {
  async signupAdmin(signupAdminInput: ISignUpAdminInput): Promise<IServiceResponse> {
    try {
      const emailExist = await _model.userModel.findOne({
        email: signupAdminInput.email,
      });

      return { success: true, message: 'signupAdmin Success', data: {} };
    } catch (error) {
      AppException.exceptionHandler(error, 'signupAdmin Failed', httpStatus.INTERNAL_SERVER_ERROR, {});
      throw error;
    }
  }
}
