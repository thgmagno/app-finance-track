'use server'

import * as jose from 'jose'
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

export async function createSessionToken(
  payload: Omit<Payload, 'iat'>,
): Promise<string> {
  const session = await new jose.SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setIssuedAt(new Date().getTime())
    .setExpirationTime('15d')
    .sign(secret)

  const { exp } = await openSessionToken(session)

  cookies().set(String(env.COOKIE_NAME), session, {
    expires: new Date((exp as number) * 1000),
    path: '/',
    httpOnly: true,
  })

  return session
}
