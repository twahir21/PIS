import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const busData = pgTable('bus_data', {
  id: uuid('id').defaultRandom().primaryKey(),
  plateNumber: text('plate_number').notNull().unique(),
  from: text('from').notNull(),
  to: text('to').notNull(),
  departure: text('departure').notNull(),
  arrival: text('arrival').notNull(),
  delayHours: integer('delayed_hours').default(0),
  delayMinutes: integer('delayed_minutes').default(0),
  status: text('status', { enum : ['ontime', 'delayed', 'cancelled']}).notNull(),
  station: text('station', { enum: ["manzese"]}).notNull(),
  type: text('type', { enum: ['express', 'normal', 'vip']}).notNull()
});