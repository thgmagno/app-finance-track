import { z } from 'zod'
import * as bcrypt from 'bcrypt'

export interface LoginFormState {
  errors: {
    email?: string[]
    password?: string[]
    _form?: string
  }
}

export interface RegisterFormState {
  errors: {
    name?: string[]
    email?: string[]
    password?: string[]
    confirmPassword?: string[]
    _form?: string
  }
}

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const RegisterSchema = z
  .object({
    name: z.string().min(1).max(32),
    email: z.string().email(),
    password: z.string().min(4),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: `Passwords don't match`,
    path: ['confirmPassword'],
  })
  .transform(async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const capitalizedName = data.name
      .split(' ')
      .map((name) => name.charAt(0).toUpperCase().concat(name.slice(1)))
      .join(' ')
    return {
      name: capitalizedName,
      email: data.email,
      hash: hashedPassword,
    }
  })
