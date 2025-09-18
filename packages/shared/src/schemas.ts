import { z } from 'zod'

export const userSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email(),
  role: z.enum(['CLIENT', 'WORKER', 'ADMIN']),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const visitSchema = z.object({
  id: z.string().cuid(),
  clientId: z.string().cuid(),
  workerId: z.string().cuid(),
  scheduledAt: z.string().datetime(),
  status: z.enum(['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
})

export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
})

export type LoginInput = z.infer<typeof loginSchema>
export type PaginationInput = z.infer<typeof paginationSchema>