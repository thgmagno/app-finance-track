'use server'

import { prisma } from '@/lib/prisma'

export async function upsert() {}

export async function findMany() {
  return prisma.methods.findMany({
    orderBy: { name: 'asc' },
  })
}

export async function findOne() {}

export async function drop() {}
