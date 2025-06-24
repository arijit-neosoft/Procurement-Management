import { model, type ObjectId, Schema } from 'mongoose';

export interface IAnswer {
  questionId: ObjectId;
  value: unknown;
}

export interface IChecklistAnswer {
  order: ObjectId;
  checklist: ObjectId;
  answers: IAnswer[];
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const answerSchema = new Schema({
  questionId: Schema.Types.ObjectId,
  value: Schema.Types.Mixed,
});

const checklistAnswerSchema = new Schema(
  {
    order: { type: Schema.Types.ObjectId, ref: 'order', required: true },
    checklist: { type: Schema.Types.ObjectId, ref: 'checklist', required: true },
    answers: [answerSchema],
    createdBy: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  },
  { timestamps: true }
);

export const checklistAnswerModel = model<IChecklistAnswer>('checklistAnswer', checklistAnswerSchema, 'checklistAnswer');
