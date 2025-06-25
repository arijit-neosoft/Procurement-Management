import { z } from 'zod';
import { QuestionType } from '../../../model/checklist.model.js';

export const QuestionTypeEnum = z.nativeEnum(QuestionType);

export const linkOrderWithChecklistInputSchema = z.object({
  orderId: z.string().nonempty().regex(/^[a-fA-F0-9]{24}$/, 'Invalid MongoDB ObjectId'),
  checklistId: z.string().nonempty().regex(/^[a-fA-F0-9]{24}$/, 'Invalid MongoDB ObjectId'),
});

export type ILinkOrderWithChecklistInput = z.input<typeof linkOrderWithChecklistInputSchema>;
