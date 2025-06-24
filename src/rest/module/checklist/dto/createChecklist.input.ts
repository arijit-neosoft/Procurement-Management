import { z } from 'zod';
import { QuestionType } from '../../../model/checklist.model.js';

export const QuestionTypeEnum = z.nativeEnum(QuestionType);

const questionInputSchema = z.object({
  questionText: z.string().min(1, 'Question text is required'),
  type: QuestionTypeEnum,
  required: z.boolean(),
  options: z.array(z.string()).optional(),
});

export const createChecklistInputSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  client: z.string().min(1, 'Client ID is required'),
  questions: z.array(questionInputSchema).min(1, 'At least one question is required'),
});

export type ICreateChecklistInput = z.input<typeof createChecklistInputSchema>;
