import { z } from 'zod'

export interface CategoryFormState {
  errors: {
    name?: string[]
    type?: string[]
    _form?: string
  }
}

export const CategorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).max(32),
  type: z.enum(['EXPENSE', 'RECEIPT', 'SAVING'], { message: 'Invalid type' }),
})
