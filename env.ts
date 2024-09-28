import { z } from 'zod'

const schema = z.object({
  AUTH_SECRET: z.string(),
  COOKIE_NAME: z.string(),
  POSTGRES_URL: z.string().url(),
  POSTGRES_PRISMA_URL: z.string().url(),
  POSTGRES_URL_NO_SSL: z.string().url(),
  POSTGRES_URL_NON_POOLING: z.string().url(),
  POSTGRES_USER: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DATABASE: z.string(),
})

export const env = schema.parse(process.env)
