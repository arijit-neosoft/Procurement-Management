import { z } from 'zod';

export const adminAssignIMtoPMInputSchema = z.object({
  inspectionManagerId: z.string(),
  procurementManagerId: z.string(),
});

export type IAdminAssignIMtoPMInput = z.input<typeof adminAssignIMtoPMInputSchema>;
