import * as v from 'valibot'
import { sql } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { brandIdSchema } from '../schemas'

const usecaseIdSchema = brandIdSchema('usc', 'UsecaseId')

const dateColumns = () => ({
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
})

const commonColumns = <B extends ReturnType<typeof brandIdSchema>>(
  schema: B,
) => ({
  id: text()
    .primaryKey()
    .$type<v.InferOutput<typeof schema>>()
    .$defaultFn(() => v.parse(schema, undefined)),
  ...dateColumns(),
})

export const usecase = sqliteTable('usecase', {
  ...commonColumns(usecaseIdSchema),
  title: text().notNull(),
  content: text().notNull().unique(),
})
