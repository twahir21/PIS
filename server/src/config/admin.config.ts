import Elysia from "elysia"
import { users } from "../db/users.db"
import { catchError } from "../errors/catch.error"
import { hashPassword } from "../secure/hash.secure"
import { db } from "../connection/drizzle.conn"
import { eq } from "drizzle-orm"

export const initiateAdmin = new Elysia({ name : "Initiate admin" })
    .get("/initiate-admin", async (): Promise<{
        success: boolean,
        message: string
    }| undefined > => {
            try {
                // 1. check if admin exists
                const admin = await db
                    .select({ id: users.id })
                    .from(users)
                    .where(eq(users.role, "admin"));
                
                if (admin.length > 0) {
                    return {
                        success: false,
                        message: "Admin alishawekwa"
                    }
                }
                // 2. create admin if not exist
                await db.insert(users).values({
                    username: process.env.ADMIN_USERNAME!,
                    password: await hashPassword(process.env.ADMIN_PASSWORD!),
                    role: "admin",
                })
                
                return {
                    success: true,
                    message: "Admin amehifadhiwa kiukamilifu"
                }
            } catch (error) {
                await catchError(error, "Hitilafu wakati wa kuingiza admin")
            }
    })