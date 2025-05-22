import { z } from 'zod';

export const createCompanySchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  university_id: z.coerce.string().optional(),
  university_card: z.string().nonempty('University Card is required'),
  password: z.string().min(8),
});
