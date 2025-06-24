import { checklistModel } from './model/checklist.model.js';
import { checklistAnswerModel } from './model/checklistAnswer.model.js';
import { orderModel } from './model/order.model.js';
import { tokenModel } from './model/token.model.js';
import { userModel } from './model/user.model.js';

export const _model = {
  userModel: userModel,
  tokenModel: tokenModel,
  orderModel: orderModel,
  checklistModel: checklistModel,
  checklistAnswerModel: checklistAnswerModel,
};
