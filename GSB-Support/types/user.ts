import { z } from 'zod';

export const userSchema = z.object({
  uid: z.string().optional(), // Optional because we create it after registration
  email: z.string().email('Email invalide'),
  fullName: z.string().min(1, 'Nom requis'),
  department: z.string().min(1, 'Département requis'),
  role: z.enum(['employee', 'support', 'admin'], {
    errorMap: () => ({ message: 'Rôle requis' }),
  }),
  createdAt: z.date().optional(),
  lastLogin: z.date().optional(),
  avatarUrl: z.string().optional(),
  password: z.string().min(6, 'Minimum 6 caractères'), // ⬅️ Required for registration
});
