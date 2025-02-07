import { Hono } from 'hono'
import api from '@/routes/api'

export default new Hono<{ Bindings: Env }>().route('/api', api)
