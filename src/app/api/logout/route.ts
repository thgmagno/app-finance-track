'use server'

import { cookies } from 'next/headers'
import { env } from 'root/env'

export async function GET(request: Request) {
  cookies().set(env.COOKIE_NAME, '', { maxAge: 0 })

  return Response.redirect(new URL('/login', request.url))
}
