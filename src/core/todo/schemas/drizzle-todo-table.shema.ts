import { InferSelectModel } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const todoTable = sqliteTable('todos', {
  id: text('id').primaryKey().notNull(),
  description: text('description').notNull().unique(),
  createdAt: text('created_at').notNull(),
});