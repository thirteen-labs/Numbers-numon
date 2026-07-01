import { z } from 'zod';

export const PersonSchema = z.object({
  id: z.string().uuid().optional(),
  firstName: z.string().min(1, 'First name is required').max(100),
  middleName: z.string().max(100).optional().default(''),
  lastName: z.string().min(1, 'Last name is required').max(100),
  dateOfBirth: z.coerce.date(),
  nickname: z.string().max(100).optional().default(''),
  gender: z.enum(['male', 'female', 'other']).optional(),
  birthTime: z.string().optional().default(''),
  notes: z.string().max(1000).optional().default(''),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Person = z.infer<typeof PersonSchema>;

export const ProfileSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  person: PersonSchema,
  isFavorite: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Profile = z.infer<typeof ProfileSchema>;

export const PersonFormSchema = PersonSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type PersonFormData = z.infer<typeof PersonFormSchema>;
