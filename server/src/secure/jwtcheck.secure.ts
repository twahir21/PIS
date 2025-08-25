import { JWTPayloadSpec } from "@elysiajs/jwt";
import { db } from "../connection/drizzle.conn";
import { users } from "../db/users.db";
import { eq } from "drizzle-orm";

export const jwtCheck = async (
    bearerToken: string,
    jwt: {
        sign(data: Record<string, string | number> & JWTPayloadSpec): Promise<string>;
        verify(jwt?: string): Promise<false | (Record<string, string | number> & JWTPayloadSpec)>;
    }
) => {
    const token = await jwt.verify(bearerToken);

    if (!token){
        return {
            status: 401,
            message: "Unauthorized"
        }
    }
    const { userId, role } = token as { userId: string; role: string };

    if(!userId || !role){
        return {
            status: 401,
            message: "Unauthorized"
        }
    }

    // update lastActive 
    await db.update(users).set({ lastActive: new Date(Date.now()) })
        .where(eq(users.id, userId));

    return { userId, role };
}