import type { ApiApp } from '@/routes/api'
import { hc } from 'hono/client'

export const apiClient = hc<ApiApp>('/api')
