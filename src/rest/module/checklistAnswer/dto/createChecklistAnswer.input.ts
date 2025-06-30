import { z } from 'zod';

export const createChecklistAnswerInputSchema = z.object({
  orderId: z.string().length(24, 'Invalid orderId'),

  answers: z
    .array(
      z.object({
        questionId: z
          .string()
          .nonempty()
          .regex(/^[a-fA-F0-9]{24}$/, 'Invalid MongoDB ObjectId'),
        value: z.union([z.boolean(), z.string(), z.array(z.string())]),
      })
    )
    .min(1, 'At least one answer is required'),
});

export type ICreateChecklistAnswerInput = z.input<typeof createChecklistAnswerInputSchema>;
