'use server'

import { redirect } from 'next/navigation'
import { createSessionToken } from './session'
import { prisma } from '@/lib/prisma'
import { LoginFormState, LoginSchema } from '@/models/auth'
import * as bcrypt from 'bcrypt'

export async function login(
  formState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const parsed = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const user = await prisma.users.findUnique({
      where: { email: parsed.data.email },
    })

    if (!user) {
      return { errors: { email: ['Email not found'] } }
    }

    const isSamePassword = await bcrypt.compare(
      parsed.data.password,
      user.password,
    )

    if (!isSamePassword) {
      return { errors: { password: [`Passwords don't match`] } }
    }

    await createSessionToken({ user })
  } catch (err) {
    return { errors: { _form: 'Cannot connect to the server' } }
  }

  redirect('/')
}
