import { z } from 'zod';

export const adminAssignIMtoPMInputSchema = z.object({
  inspectionManagerId: z.string().nonempty(),
  procurementManagerId: z.string().nonempty(),
});

export type IAdminAssignIMtoPMInput = z.input<typeof adminAssignIMtoPMInputSchema>;
