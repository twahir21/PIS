import { eq, or } from "drizzle-orm";
import { db } from "../connection/drizzle.conn";
import { users } from "../db/users.db";
import { catchError } from "../errors/catch.error";

export const AuthModels = {
    fetchLogin: async (username: string) => {
        try {
            const user = await db
            .select({ 
                id: users.id,
                role: users.role,
                username: users.username,
                hashedPassword: users.password
            })
            .from(users)
            .where(eq(users.username, username))
            .limit(1)
            .then(r => r[0]);

        return user;
        } catch (error) {
            await catchError(error, "Error fetching user")
        }
    }
}