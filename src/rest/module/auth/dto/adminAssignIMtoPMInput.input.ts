import { z } from 'zod';

export const adminAssignIMtoPMInputSchema = z.object({
  inspectionManagerId: z
    .string()
    .nonempty()
    .regex(/^[a-fA-F0-9]{24}$/, 'Invalid MongoDB ObjectId'),
  procurementManagerId: z
    .string()
    .nonempty()
    .regex(/^[a-fA-F0-9]{24}$/, 'Invalid MongoDB ObjectId'),
});

export type IAdminAssignIMtoPMInput = z.input<typeof adminAssignIMtoPMInputSchema>;
