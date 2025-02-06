import type { Config } from 'drizzle-kit'

export default {
  out: './drizzle',
  schema: './database/schema.ts',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    databaseId: 'f603fd5a-26ae-4dad-a32c-39e86ea5adaa',
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    token: process.env.CLOUDFLARE_TOKEN!,
  },
} satisfies Config
