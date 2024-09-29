'use server'

import { prisma } from '@/lib/prisma'
import { RegisterFormState, RegisterSchema } from '@/models/auth'
import { createSessionToken } from './session'
import { redirect } from 'next/navigation'

export async function register(
  formState: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> {
  const parsed = await RegisterSchema.safeParseAsync({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const user = await prisma.users.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        password: parsed.data.hash,
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
