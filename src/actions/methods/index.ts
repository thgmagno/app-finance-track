'use server'

import { prisma } from '@/lib/prisma'
import { MethodFormState, MethodSchema } from '@/models/methods'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export async function upsert(
  formState: MethodFormState,
  formData: FormData,
): Promise<MethodFormState> {
  const parsed = MethodSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const teamsId = 'cm1lkj5n400020cl40cda41lc'

    await prisma.methods.upsert({
      where: { id: parsed.data.id },
      update: {
        name: parsed.data.name,
      },
      create: {
        name: parsed.data.name,
        teamsId,
      },
    })
  } catch (err) {
    return {
      errors: { _form: 'Cannot connect to the server. Please try again' },
    }
  }

  revalidateTag('methods')
  redirect('/settings/methods')
}
export async function findMany() {
  return prisma.methods.findMany({
    orderBy: { name: 'asc' },
  })
}

export async function findOne() {}

export async function drop(id: string) {
  try {
    await prisma.methods.delete({
      where: { id },
    })
  } catch (err) {
    return {
      success: false,
      message: 'Unable to complete the request, try again',
    }
  }

  revalidateTag('methods')
  return {
    success: true,
    message: '✔️ Deleted successfully',
  }
}
