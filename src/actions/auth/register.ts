'use server'

import { prisma } from '@/lib/prisma'
import { RegisterFormState, RegisterSchema } from '@/models/auth'
import { createSessionToken } from './session'
import { redirect } from 'next/navigation'

export async function register(
  formState: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> {
  const parsed = await RegisterSchema.parseAsync({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  if (!parsed) {
    return { errors: { _form: 'Invalid data' } }
  }

  try {
    const user = await prisma.users.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        password: parsed.hash,
      },
      select: { id: true, name: true, teamId: true },
    })

    await createSessionToken({ user })
  } catch (err) {
    if (err instanceof Error && err.message.includes('Unique constraint')) {
      return { errors: { email: ['This e-mail address already exists'] } }
    } else {
      console.log(err)
      return { errors: { _form: 'Cannot connect to the server' } }
    }
  }

  redirect('/')
}
