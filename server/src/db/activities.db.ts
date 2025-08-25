import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Audit table -> Tracking who changed what ? and when ?
// pick userId when he made change request to database

export const activities = pgTable("activities", {
    id: uuid("id").defaultRandom().primaryKey(),
    activity: text("activity").notNull(),
    type: text("type", { enum : ["update", "delete", "create"]}).notNull().default("create"),
    description: text("description").notNull(),
    createdAt: timestamp("created_at").defaultNow()
})