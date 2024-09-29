'use server'

import { prisma } from '@/lib/prisma'
import { Teams, Users } from '@prisma/client'
import * as jose from 'jose'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { env } from 'root/env'

const secret = new TextEncoder().encode(env.AUTH_SECRET)

interface Payload extends jose.JWTPayload {
  sub: string
  name: string
  team: string
  teamId: string
  iat: number
}

export async function openSessionToken(token: string): Promise<Payload> {
  const { payload } = await jose.jwtVerify(token, secret)
  return payload as Payload
}

export async function createSessionToken({
  user,
  team,
}: {
  user?: Pick<Users, 'id' | 'name' | 'teamId'>
  team?: Pick<Teams, 'id' | 'name'>
}): Promise<string> {
  const oldest = await getServerSession()

  const payload = {
    sub: user?.id ? user.id : oldest?.sub || '',
    name: user?.name ? user.name : oldest?.name || '',
    team: team?.name ? team.name : oldest?.team || '',
    teamId: team?.id ? team.id : oldest?.teamId || '',
  }

  if ((!payload.teamId || !payload.team) && user?.teamId) {
    const team = await prisma.teams.findUnique({
      where: { id: user.teamId },
    })
    payload.team = team?.name || ''
    payload.teamId = team?.id || ''
  }

  const session = await new jose.SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setIssuedAt(Math.floor(Date.now() / 1000))
    .setExpirationTime('15d')
    .sign(secret)

  const { sub, exp, iat } = await openSessionToken(session)

  cookies().set(String(env.COOKIE_NAME), session, {
    expires: new Date((exp as number) * 1000),
    path: '/',
    httpOnly: true,
  })

  await prisma.session.upsert({
    where: { usersId: sub },
    update: { token: session, timestamp: iat },
    create: { usersId: sub, token: session, timestamp: iat },
  })

  revalidateTag('keep-session-updated')

  return session
}

export async function getServerSession() {
  const token = cookies().get(env.COOKIE_NAME)?.value

  if (!token) {
    return { sub: '', name: '', team: '', teamId: '', iat: 0 }
  }

  const payload = await openSessionToken(token)
  return payload
}

export async function keepSessionUpdated() {
  const { sub, iat } = await getServerSession()

  const updatedSession = await prisma.session.findUnique({
    where: { usersId: sub, timestamp: { gt: iat } },
  })

  if (!updatedSession) return null

  const payload = await openSessionToken(updatedSession.token)

  return createSessionToken({
    user: { id: payload.sub, name: payload.name, teamId: payload.teamId },
    team: { id: payload.teamId, name: payload.team },
  })
}
