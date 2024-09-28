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
  name: z.string().min(1),
  type: z
    .string()
    .min(1)
    .refine((val) => {
      const enums = ['EXPENSE', 'RECEIPT', 'SAVING']
      return enums.includes(val)
    }, 'The type provided is not valid'),
})
