import { eq } from "drizzle-orm"
import { db } from "../connection/drizzle.conn"
import { busData } from "../db/bus.db"
import { catchError } from "../errors/catch.error"
import { status } from "../const/statCode.const"
import { activities } from "../db/activities.db"

export const busModels = {
    createBus: async (
        body: {
            plateNumber: string,
            from: "Dar Es Salaam" | "Iringa" | "Singida" | "Dodoma",
            to: "Dodoma" | "Dar Es Salaam" | "Iringa" | "Singida",
            arrival: string,
            departure: string,
            status: "ontime" | "delayed" | "cancelled",
            station: "manzese",
            type: "express" | "normal" | "vip",
            delayHours?: string,
            delayMinutes?: string
        }
    ) => {
        try {
            // 1. check if bus exists
            const isExists = await db
                .select({ id: busData.id })
                .from(busData)
                .where(eq(busData.plateNumber, body.plateNumber))
                .limit(1)
                .then(r => r[0]);

            if (isExists) {
                return {
                    success: false,
                    status: status.BAD_REQUEST,
                    message: "Bus already exists"
                }
            }
            // 2. create bus
            await db.insert(busData).values({
                plateNumber: body.plateNumber,
                from: body.from,
                to: body.to,
                arrival: body.arrival,
                departure: body.departure,
                status: body.status,
                station: body.station,
                type: body.type,
                delayHours: Number(body.delayHours) || 0,
                delayMinutes: Number(body.delayMinutes) || 0
            });

            // save the audit activity
            await db.insert(activities).values({
                activity: "New Bus created",
                type: "create",
                description: body.plateNumber
            })

            return {
                success: true,
                status: status.CREATED,
                message: "Bus created successfully"
            }
        } catch (error) {
            await catchError(error, "Error creating bus")
        }
    },

    read: async () => {
        try {
            const buses = await db
                .select()
                .from(busData)

            return {
                success: true,
                status: status.OK,
                message: "Buses fetched successfully",
                data: buses
            }

        } catch (error) {
            await catchError(error, "Error reading buses")
        }
    },

    readOne: async(id: string) => {
        try {
            const bus = await db
                .select()
                .from(busData)
                .where(eq(busData.id, id))
                .limit(1)
                .then(r => r[0]);

            return {
                success: true,
                status: status.OK,
                message: "Bus fetched successfully",
                data: bus
            }

        } catch (error) {
            await catchError(error, "Error reading bus")
        }
    },

    update: async (
    body: {
        plateNumber: string;
        from: "Dar Es Salaam" | "Iringa" | "Singida" | "Dodoma";
        to: "Dodoma" | "Dar Es Salaam" | "Iringa" | "Singida";
        arrival: string;
        departure: string;
        status: "ontime" | "delayed" | "cancelled";
        station: "manzese";
        type: "express" | "normal" | "vip";
        delayHours?: string,
        delayMinutes?: string
    },
    id: string,
    role: string
    ): Promise<{
    success: boolean;
    status: number;
    message: string;
    } | undefined> => {
    try {
        let result;
        // 👤 Operator can only change times + status
        if (role === "operator") {
        result = await db
            .update(busData)
            .set({
            arrival: body.arrival,
            departure: body.departure,
            status: body.status,
            delayHours: Number(body.delayHours) || 0,
            delayMinutes: Number(body.delayMinutes) || 0
            })
            .where(eq(busData.id, id))
            .returning({ id: busData.id });
        } 
        // 👑 Admin (or other roles) can change everything
        else {
        result = await db
            .update(busData)
            .set({
            plateNumber: body.plateNumber,
            from: body.from,
            to: body.to,
            arrival: body.arrival,
            departure: body.departure,
            status: body.status,
            station: body.station,
            type: body.type,
            delayHours: Number(body.delayHours) || 0,
            delayMinutes: Number(body.delayMinutes) || 0
            })
            .where(eq(busData.id, id))
            .returning({ id: busData.id });
        }

        // 🚨 If no row was updated
        if (!result || result.length === 0) {
        return {
            success: false,
            status: status.NOT_FOUND,
            message: "Bus not found",
        };
        }

        // 📝 Save activity log
        await db.insert(activities).values({
        activity: "Bus updated",
        type: "update",
        description: body.plateNumber,
        });

        return {
        success: true,
        status: status.OK,
        message: "Bus updated successfully",
        };
    } catch (error) {
        await catchError(error, "Error updating bus");
    }
    },


    delete: async (id: string) => {
        try {
            const result = await db.delete(busData)
            .where(eq(busData.id, id))
            .returning({ plateNumber: busData.plateNumber }) // will return the deleted rows

            if (result.length === 0) {
                return { 
                    success: false, 
                    status: status.NOT_FOUND, 
                    message: "Bus not found" 
                }
            }

            // save the audit activity
            await db.insert(activities).values({
                activity: "Bus deleted",
                type: "delete",
                description: result[0].plateNumber
            });

            return {
                success: true,
                status: status.OK,
                message: "Bus deleted successfully" 
            }
        } catch (error) {
            await catchError(error, "Error deleting bus")
        }
    }
}