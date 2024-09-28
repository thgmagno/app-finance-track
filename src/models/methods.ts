import { z } from 'zod'

export interface MethodFormState {
  errors: {
    name?: string[]
    _form?: string
  }
}

export const MethodSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
})
