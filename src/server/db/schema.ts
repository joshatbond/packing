// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration
import { relations, sql } from 'drizzle-orm'
import { index, int, sqliteTableCreator, text } from 'drizzle-orm/sqlite-core'

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator(name => `packing_${name}`)

export const boxes = createTable(
  'box',
  {
    id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name', { length: 256 }).notNull(),
    description: text('description', { length: 256 }),
    createdAt: int('created_at', { mode: 'timestamp' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: int('updatedAt', { mode: 'timestamp' }),
  },
  example => ({
    nameIndex: index('name_idx').on(example.name),
  })
)

export const items = createTable('item', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name', { length: 256 }),
  description: text('description', { length: 256 }),
  image: text('src'),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: int('updatedAt', { mode: 'timestamp' }),
})

export const labels = createTable('label', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name', { length: 256 }).notNull(),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

export const boxRelations = relations(boxes, ({ many }) => ({
  items: many(items),
}))
export const itemRelations = relations(items, ({ many, one }) => ({
  box: one(boxes),
  labels: many(labels),
}))
export const labelRelations = relations(labels, ({ many }) => ({
  items: many(items),
}))
