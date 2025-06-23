import bcryptjs from 'bcryptjs';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { config } from '../../../config/config.js';
import { _model } from '../../_model.js';
import type { IServiceResponse } from '../../interface/appResponse.interface.js';
import type { IJwtPayload } from '../../interface/jwt.interface.js';
import { AppException } from '../../lib/appException.lib.js';
import { EmailService } from '../../lib/emailService.lib.js';
import { TokenType } from '../../model/token.model.js';
import { ICreateUsersByAdminInput } from './dto/createUsersByAdmin.input.js';
import type { ISigninInput } from './dto/signin.input.js';
import type { ISignUpAdminInput } from './dto/signupAdmin.input.js';
import type { IVerifyInput } from './dto/verify.input.js';
import type { IVerifyLinkInput } from './dto/verifyLInk.input.js';

export class AuthService {
  async signupAdmin(signupAdminInput: ISignUpAdminInput): Promise<IServiceResponse> {
    try {
      const emailExist = await _model.userModel.findOne({ email: signupAdminInput.email });

      if (emailExist) {
        throw new AppException('Email already exist', httpStatus.BAD_REQUEST, {});
      }

      const phoneExist = await _model.userModel.findOne({ phoneNumber: signupAdminInput.phoneNumber });

      if (phoneExist) {
        throw new AppException('Phone number already exist', httpStatus.BAD_REQUEST, {});
      }

      const verifyToken = jwt.sign({ email: signupAdminInput.email }, config.jwt.JWT_VERIFY_TOKEN_SECRET, {
        expiresIn: config.tokenExpiration.VERIFY_TOKEN_EXPIRATION,
      });

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

      return { success: true, message: 'signupAdmin success, proceed to verification', data: {} };
    } catch (error) {
      AppException.exceptionHandler(error, 'signupAdmin failed', httpStatus.INTERNAL_SERVER_ERROR, {});
      throw error;
    }
  }

  async verifyLink(verifyLinkInput: IVerifyLinkInput): Promise<IServiceResponse> {
    try {
      const user = await _model.userModel.findOne({ email: verifyLinkInput.email });

      if (!user) {
        throw new AppException('Invalid user', httpStatus.BAD_REQUEST, {});
      }

      const passwordCompare = await bcryptjs.compare(verifyLinkInput.password, user.passwordHash);

      if (!passwordCompare) {
        throw new AppException('Invalid Credentials', httpStatus.BAD_REQUEST, {});
      }

      const verifyToken = jwt.sign({ id: user.id, email: verifyLinkInput.email }, config.jwt.JWT_VERIFY_TOKEN_SECRET, {
        expiresIn: config.tokenExpiration.VERIFY_TOKEN_EXPIRATION,
      });

      await EmailService.sendEmail('User Verification Link', `token: ${verifyToken}`, verifyLinkInput.email);

      await _model.tokenModel.updateOne(
        { email: verifyLinkInput.email, tokenType: TokenType.VERIFY_TOKEN }, // Filter
        {
          $set: {
            token: verifyToken,
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      );

      return { success: true, message: 'verifyLink sent successfully', data: {} };
    } catch (error) {
      AppException.exceptionHandler(error, 'verifyLink generate failed', httpStatus.INTERNAL_SERVER_ERROR, {});
      throw error;
    }
  }

  async verify(verifyInput: IVerifyInput): Promise<IServiceResponse> {
    try {
      const decoded = jwt.verify(verifyInput.verifyToken, config.jwt.JWT_VERIFY_TOKEN_SECRET) as IJwtPayload;

      const token_exist = await _model.tokenModel.findOne({ token: verifyInput.verifyToken, email: decoded.email });

      if (!token_exist) {
        throw new AppException('Invalid Token', httpStatus.BAD_REQUEST, {});
      }

      const user = await _model.userModel.findOne({ email: decoded.email });

      if (!user) {
        throw new AppException('User does not exist', httpStatus.BAD_REQUEST, {});
      }

      await _model.userModel.updateOne({ email: decoded.email }, { verified: true });
      await _model.tokenModel.deleteOne({ token: verifyInput.verifyToken, email: decoded.email });

      return { success: true, message: 'verify success', data: { email: decoded.email } };
    } catch (error) {
      AppException.exceptionHandler(error, 'verify failed', httpStatus.INTERNAL_SERVER_ERROR, {});
      throw error;
    }
  }

  async signin(signinInput: ISigninInput): Promise<IServiceResponse> {
    try {
      const user = await _model.userModel.findOne({ email: signinInput.email });

      if (!user) {
        throw new AppException('Invalid user', httpStatus.BAD_REQUEST, {});
      }

      if (!user.verified) {
        throw new AppException('User not verified', httpStatus.FORBIDDEN, {});
      }

      if (!user.active) {
        throw new AppException('User not active', httpStatus.FORBIDDEN, {});
      }

      const passwordCompare = await bcryptjs.compare(signinInput.password, user.passwordHash);

      if (!passwordCompare) {
        throw new AppException('Invalid Credentials', httpStatus.BAD_REQUEST, {});
      }

      const jwtPayload: IJwtPayload = { id: user.id, email: user.email };

      const accessToken = jwt.sign(jwtPayload, config.jwt.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: config.tokenExpiration.ACCESS_TOKEN_EXPIRATION,
      });
      const refreshToken = jwt.sign(jwtPayload, config.jwt.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: config.tokenExpiration.REFRESH_TOKEN_EXPIRATION,
      });

      return { success: true, message: 'signin success', data: { accessToken, refreshToken } };
    } catch (error) {
      AppException.exceptionHandler(error, 'signin failed', httpStatus.INTERNAL_SERVER_ERROR, {});
      throw error;
    }
  }

  async createUsersByAdmin(createUsersByAdminInput: ICreateUsersByAdminInput): Promise<IServiceResponse> {
    try {
      const emailExist = await _model.userModel.findOne({
        email: createUsersByAdminInput.email,
      });

      if (emailExist) {
        throw new AppException('Email already exist', httpStatus.BAD_REQUEST, {});
      }

      const phoneExist = await _model.userModel.findOne({
        phoneNumber: createUsersByAdminInput.phoneNumber,
      });

      if (phoneExist) {
        throw new AppException('Phone number already exist', httpStatus.BAD_REQUEST, {});
      }

      const verifyToken = jwt.sign({ email: createUsersByAdminInput.email }, config.jwt.JWT_VERIFY_TOKEN_SECRET, {
        expiresIn: config.tokenExpiration.VERIFY_TOKEN_EXPIRATION,
      });

      await EmailService.sendEmail('User Verification Link', `token: ${verifyToken}`, createUsersByAdminInput.email);

      await _model.tokenModel.create({ email: createUsersByAdminInput.email, token: verifyToken, tokenType: TokenType.VERIFY_TOKEN });

      const passwordHash = await bcryptjs.hash(createUsersByAdminInput.password, 10);

      const user = await _model.userModel.create({
        firstName: createUsersByAdminInput.firstName,
        lastName: createUsersByAdminInput.lastName,
        email: createUsersByAdminInput.email,
        passwordHash: passwordHash,
        dob: createUsersByAdminInput.dob,
        phoneNumber: createUsersByAdminInput.phoneNumber,
        role: createUsersByAdminInput.role,
      });

      return { success: true, message: 'createUsersByAdmin success, proceed to verification', data: { user } };
    } catch (error) {
      AppException.exceptionHandler(error, 'createUsersByAdmin failed', httpStatus.INTERNAL_SERVER_ERROR, {});
      throw error;
    }
  }
}
