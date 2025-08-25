import { Elysia } from 'elysia'
import { cron } from '@elysiajs/cron'
import { db } from '../connection/drizzle.conn'
import { activities } from '../db/activities.db'
import { sql } from 'drizzle-orm'

export const deleteLogs = new Elysia()
  .use(
    cron({
      name: 'delete-old-logs',
      pattern: '0 4 * * *', // every day at 04:00
      async run() {
        // Delete everything except the latest 8
        const deleted = await db.execute(
          sql`
            DELETE FROM ${activities}
            WHERE id NOT IN (
              SELECT id FROM ${activities}
              ORDER BY created_at DESC
              LIMIT 8
            )
            RETURNING id
          `
        )

        console.log(`Deleted ${deleted.count} old activities`)
        return { deletedCount: deleted.count }
      }
    })
  )
