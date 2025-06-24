// models/Checklist.js
import { model, type ObjectId, Schema } from 'mongoose';

export enum QuestionType {
  BOOLEAN = 'BOOLEAN',
  DROPDOWN = 'DROPDOWN',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TEXT = 'TEXT',
  FILE = 'FILE',
}

export interface IQuestion {
  questionText: string;
  type: QuestionType;
  options?: string[];
  required?: boolean;
}

export interface IChecklist {
  _id: ObjectId;
  title: string;
  client: ObjectId;
  createdBy: ObjectId;
  questions: IQuestion[];
  createdAt: Date;
  updatedAt: Date;
}

const questionSchema = new Schema({
  questionText: { type: String, required: true },
  type: { type: String, enum: Object.values(QuestionType), required: true },
  options: [String],
  required: { type: Boolean, default: false },
});

const checklistSchema = new Schema(
  {
    title: { type: String, required: true },
    client: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    questions: [questionSchema],
  },
  { timestamps: true }
);

export const checklistModel = model<IChecklist>('checklist', checklistSchema, 'checklist');
