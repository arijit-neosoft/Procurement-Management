import { z } from 'zod';
import { QuestionType } from '../../../model/checklist.model.js';

export const QuestionTypeEnum = z.nativeEnum(QuestionType);

export const linkOrderWithChecklistInputSchema = z.object({
  orderId: z.string().nonempty(),
  checklistId: z.string().nonempty(),
});

export type ILinkOrderWithChecklistInput = z.input<typeof linkOrderWithChecklistInputSchema>;
