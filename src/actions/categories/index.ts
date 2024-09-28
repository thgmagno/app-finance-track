'use server'

import { prisma } from '@/lib/prisma'
import { CategoryFormState, CategorySchema } from '@/models/category'
import { $Enums } from '@prisma/client'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export async function upsert(
  formState: CategoryFormState,
  formData: FormData,
): Promise<CategoryFormState> {
  const parsed = CategorySchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    type: formData.get('type'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    // userId: 'cm1lkjsgh00040cl473nr0rpw'
    const teamsId = 'cm1lkj5n400020cl40cda41lc'

    await prisma.categories.upsert({
      where: { id: parsed.data.id },
      update: {
        name: parsed.data.name,
        type: parsed.data.type as $Enums.CategoryType,
      },
      create: {
        name: parsed.data.name,
        type: parsed.data.type as $Enums.CategoryType,
        teamsId,
      },
    })
  } catch (err) {
    return {
      errors: { _form: 'Cannot connect to the server. Please try again' },
    }
  }

  revalidateTag('categories')
  redirect('/settings/categories')
}

export async function findMany() {
  return prisma.categories.findMany({
    orderBy: { name: 'asc' },
  })
}

export async function findOne() {}

export async function drop(id: string) {
  try {
    await prisma.categories.delete({
      where: { id },
    })
  } catch (err) {
    return {
      success: false,
      message: 'Unable to complete the request, try again',
    }
  }

  revalidateTag('categories')
  return {
    success: true,
    message: '✔️ Deleted successfully',
  }
}
