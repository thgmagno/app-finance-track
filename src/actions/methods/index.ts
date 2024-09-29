'use server'

import { prisma } from '@/lib/prisma'
import { MethodFormState, MethodSchema } from '@/models/methods'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { getServerSession } from '@/actions/auth/session'

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
    const { teamId } = await getServerSession()

    if (!teamId) {
      return {
        errors: {
          _form:
            'You must create or participate in a team before creating a new method. Please make sure you have a team and try again',
        },
      }
    }

    await prisma.methods.upsert({
      where: { id: parsed.data.id },
      update: {
        name: parsed.data.name,
      },
      create: {
        name: parsed.data.name,
        teamId,
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
