import { eq } from "drizzle-orm"
import { db } from "../connection/drizzle.conn"
import { catchError } from "../errors/catch.error"
import { status } from "../const/statCode.const"
import { users } from "../db/users.db"
import { activities } from "../db/activities.db"
import { hashPassword } from "../secure/hash.secure"

export const assistantModels = {
    createAssistant: async (
        body: {
            username: string,
            password: string,
            role: "assistant" | "operator"
        }
    ) => {
        try {
            // 1. check if assistant exists
            const isExists = await db
                .select({ id: users.id })
                .from(users)
                .where(eq(users.username, body.username))
                .limit(1)
                .then(r => r[0]);

            if (isExists) {
                return {
                    success: false,
                    status: status.BAD_REQUEST,
                    message: "User already exists"
                }
            }
            // 2. create assistant
            await db.insert(users).values({
                username: body.username,
                password: await hashPassword(body.password),
                role: body.role
            });

            // 3. save the audit activity
            await db.insert(activities).values({
                activity: "User account created",
                type: "create",
                description: body.username
            });

            return {
                success: true,
                status: status.CREATED,
                message: "User created successfully"
            }
        } catch (error) {
            await catchError(error, "Error creating assistant")
        }
    },

    readAssistants: async () => {
        try {
            const assistants = await db
                .select({
                    id: users.id,
                    username: users.username,
                    role: users.role,
                    createdAt: users.createdAt,
                    lastActive: users.lastActive
                })
                .from(users)

            return {
                success: true,
                status: status.OK,
                message: "Assistants fetched successfully",
                data: assistants
            }

        } catch (error) {
            await catchError(error, "Error reading assistants")
        }
    },

    readOne: async(id: string) => {
        try {
            const assistant = await db
                .select()
                .from(users)
                .where(eq(users.id, id))
                .limit(1)
                .then(r => r[0]);

            return {
                success: true,
                status: status.OK,
                message: "assistant fetched successfully",
                data: assistant
            }

        } catch (error) {
            await catchError(error, "Error reading assistant")
        }
    },

    update: async (
        body: {
            username: string,
            password: string,
            role: "assistant" | "operator"
        },
        id: string
    ): Promise<{
        success: boolean,
        status: number,
        message: string
    } | undefined > => {
        try {
            const result = await db.update(users)
            .set({
                username: body.username,
                password: body.password,
                role: body.role
            })
            .where(eq(users.id, id))
            .returning({ id: users.id }) // will return the updated rows

            if (result.length === 0) {
                return { 
                    success: false, 
                    status: status.NOT_FOUND, 
                    message: "Assistant not found" 
                }
            }

            // save the audit activity
            await db.insert(activities).values({
                activity: "User account updated",
                type: "update",
                description: body.username
            });

            return {
                success: true,
                status: status.OK,
                message: "Assistant updated successfully"
            }
        } catch (error) {
            await catchError(error, "Error updating assistant")
        }
    }, 

    delete: async (id: string) => {
        try {

            // block deletion of admin
            const isAdmin = await db
                .select({ role: users.role })
                .from(users)
                .where(eq(users.id, id))
                .limit(1)
                .then(r => r[0]);
            
            if (isAdmin.role === "admin") {
                return {
                    success: false,
                    status: status.BAD_REQUEST,
                    message: "Admin cannot be deleted"
                }
            }

            const result = await db.delete(users)
            .where(eq(users.id, id))
            .returning({ username: users.username }) // will return the deleted rows

            if (result.length === 0) {
                return { 
                    success: false, 
                    status: status.NOT_FOUND, 
                    message: "Assistant not found" 
                }
            }
            // save the audit activity
            await db.insert(activities).values({
                activity: "User account deleted",
                type: "delete",
                description: result[0].username
            });

            return {
                success: true,
                status: status.OK,
                message: "Assistant deleted successfully" 
            }
        } catch (error) {
            await catchError(error, "Error deleting assistant")
        }
    }
}