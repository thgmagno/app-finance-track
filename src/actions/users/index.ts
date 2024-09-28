'use server'

import { prisma } from '@/lib/prisma'

export async function getUsers() {
  return prisma.users.findMany({})
}

export async function createUserExample() {}
