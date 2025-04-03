import { randomUUID } from 'node:crypto'
import type { ExecutionContext } from '@cloudflare/workers-types'
import type { AppLoadContext } from 'react-router'

declare global {
  type CloudflareEnvironment = Env
}

declare module 'react-router' {
  export interface AppLoadContext {
    cloudflare: {
      env: CloudflareEnvironment
      ctx: Omit<ExecutionContext, 'props'>
    }
    nonce?: string
  }
}

type GetLoadContextArgs = {
  request: Request
  context: Pick<AppLoadContext, 'cloudflare'>
}

export function getLoadContext({ context }: GetLoadContextArgs) {
  return {
    cloudflare: context.cloudflare,
    nonce: randomUUID(),
  }
}
