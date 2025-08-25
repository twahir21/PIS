import Elysia from "elysia";
import { db } from "../connection/drizzle.conn";
import { catchError } from "../errors/catch.error";
import { busData } from "../db/bus.db";
import { count, desc, eq } from "drizzle-orm";
import { users } from "../db/users.db";
import { activities } from "../db/activities.db";

export const overviewPlugin = new Elysia({ name : "Overview Analytics" })
    .get("/overview", async () => {
        try {
            const totalBuses = await db
            .select({
                total: count(busData.id)
            })
            .from(busData)
            .then(r => r[0]);

            const totalOperators = await db
            .select({
                total: count(users.id)
            })
            .from(users)
            .where(eq(users.role, "operator"))
            .then(r => r[0]);

            const totalAssistants = await db
            .select({
                total: count(users.id)
            })
            .from(users)
            .where(eq(users.role, "assistant"))
            .then(r => r[0]);

            const totalBusOntime = await db
            .select({
                total: count(busData.id)
            })
            .from(busData)
            .where(eq(busData.status, "ontime"))
            .then(r => r[0]);

            const totalBusDelayed = await db
            .select({
                total: count(busData.id)
            })
            .from(busData)
            .where(eq(busData.status, "delayed"))
            .then(r => r[0]);

            return {
                success: true,
                status: 200,
                message: "Overview fetched successfully",
                data: {
                    totalBuses: totalBuses.total,
                    totalOperators: totalOperators.total,
                    totalAssistants: totalAssistants.total,
                    totalBusOntime: totalBusOntime.total,
                    totalBusDelayed: totalBusDelayed.total
                }
            }
        } catch (error) {
            await catchError(error, "Error reading overview")
        }
    })
    .get("/activities", async () => {
        try {
            const fetchActivites = await db
            .select()
            .from(activities)
            .orderBy(desc(activities.createdAt))
            .limit(7);

            return {
                success: true,
                status: 200,
                message: "Activities fetched successfully",
                data: fetchActivites
            }
        } catch (error) {
            await catchError(error, "Error reading activities")
        }
    })