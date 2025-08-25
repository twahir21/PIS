import { JWTPayloadSpec } from "@elysiajs/jwt";
import { status } from "../const/statCode.const"
import { VerifyPassword } from "../secure/hash.secure";
import { AuthModels } from "../models/auth.model";

export const AuthServices = {
    login: async (
        username: string, 
        password: string, 
        jwt: {
            sign(data: Record<string, string | number> & JWTPayloadSpec): Promise<string>;
            verify(jwt?: string): Promise<false | (Record<string, string | number> & JWTPayloadSpec)>;
        }, 
    ) => {

        // 1. Check if user exists
        const checkUser = await AuthModels.fetchLogin(username);

        if (!checkUser || !checkUser.role) {
            return {
                success: false,
                status: status.UNAUTHORIZED,
                message: "Invalid credentials"
            }
        }

        // 2. Check if password is correct
        const isValid = await VerifyPassword(password, checkUser.hashedPassword);

        if (!isValid) {
            return {
                success: false,
                status: status.UNAUTHORIZED,
                message: "Invalid credentials"
            }
        }

        // 3. generating token
        const token = await jwt.sign({
            userId: checkUser.id,
            role: checkUser.role
        });

        return {
            success: true,
            status: status.OK,
            token,
            username: checkUser.username,
            role: checkUser.role,
            message: "Taarifa zimehifadhiwa kiukamilifu"
        }
    }
}