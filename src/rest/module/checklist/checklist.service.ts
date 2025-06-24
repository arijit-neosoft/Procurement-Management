import httpStatus from 'http-status';
import { _model } from '../../_model.js';
import type { IServiceResponse } from '../../interface/appResponse.interface.js';
import { AppException } from '../../lib/appException.lib.js';
import { type IUser, Role } from '../../model/user.model.js';
import type { ICreateChecklistInput } from './dto/createChecklist.input.js';

export class ChecklistService {
  async createChecklist(pmUser: IUser, createChecklistInput: ICreateChecklistInput): Promise<IServiceResponse> {
    try {
      const existingChecklist = await _model.checklistModel.findOne({
        title: createChecklistInput.title,
        client: createChecklistInput.client,
      });

      if (existingChecklist) {
        throw new AppException('Checklist with the same title and client already exists', httpStatus.CONFLICT, {});
      }

      const checklist = await _model.checklistModel.create({
        title: createChecklistInput.title,
        client: createChecklistInput.client,
        createdBy: pmUser._id,
        questions: createChecklistInput.questions,
      });

      return { success: true, message: 'createChecklist success', data: checklist };
    } catch (error) {
      AppException.exceptionHandler(error, 'createChecklist failed', httpStatus.INTERNAL_SERVER_ERROR, {});
      throw error;
    }
  }

  async getChecklists(user: IUser): Promise<IServiceResponse> {
    try {
      if (user.role === Role.ADMIN) {
        const checklists = await _model.checklistModel.find().populate('client').populate('createdBy');
        return { success: true, message: 'ADMIN getChecklists success', data: checklists };
      }

      if (user.role === Role.PROCUREMENT_MANAGER) {
        const checklists = await _model.checklistModel.find({ createdBy: user._id }).populate('client').populate('createdBy');
        return { success: true, message: 'PROCUREMENT_MANAGER getChecklists success', data: checklists };
      }

      if (user.role === Role.CLIENT) {
        const checklists = await _model.checklistModel.find({ client: user._id }).populate('client').populate('createdBy');
        return { success: true, message: 'CLIENT getChecklists success', data: checklists };
      }

      return { success: false, message: 'NO USER', data: {} };
    } catch (error) {
      AppException.exceptionHandler(error, 'getChecklists failed', httpStatus.INTERNAL_SERVER_ERROR, {});
      throw error;
    }
  }
}
