import bcryptjs from 'bcryptjs';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { config } from '../../../config/config.js';
import { _model } from '../../_model.js';
import type { IServiceResponse } from '../../interface/AppResponse.interface.js';
import { AppException } from '../../lib/appException.lib.js';
import { EmailService } from '../../lib/emailService.lib.js';
import { TokenType } from '../../model/token.model.js';
import type { ISignUpAdminInput } from './dto/signupAdmin.input.js';

export class AuthService {
  async signupAdmin(signupAdminInput: ISignUpAdminInput): Promise<IServiceResponse> {
    try {
      const emailExist = await _model.userModel.findOne({
        email: signupAdminInput.email,
      });

      if (emailExist) {
        throw new AppException('Email already exist', httpStatus.BAD_REQUEST, {});
      }

      const verifyToken = jwt.sign({ email: signupAdminInput.email }, config.jwt.JWT_VERIFY_TOKEN_SECRET, { expiresIn: '10m' });

      await EmailService.sendEmail('User Verification Link', `token: ${verifyToken}`, signupAdminInput.email);

      await _model.tokenModel.create({ email: signupAdminInput.email, token: verifyToken, tokenType: TokenType.VERIFY_TOKEN });

      const passwordHash = await bcryptjs.hash(signupAdminInput.password, 10);

      await _model.userModel.create({
        firstName: signupAdminInput.firstName,
        lastName: signupAdminInput.lastName,
        email: signupAdminInput.email,
        passwordHash: passwordHash,
        dob: signupAdminInput.dob,
        phoneNumber: signupAdminInput.phoneNumber,
      });

      return { success: true, message: 'signupAdmin Success', data: {} };
    } catch (error) {
      AppException.exceptionHandler(error, 'signupAdmin Failed', httpStatus.INTERNAL_SERVER_ERROR, {});
      throw error;
    }
  }
}
