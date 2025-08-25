import Elysia from "elysia";
import { busesPlugin } from "./buses.plugin";
import jwt from "@elysiajs/jwt";
import { assistantsPlugin } from "./assistants.plugin";
import { jwtCheck } from "../secure/jwtcheck.secure";

export const privateRoutes = new Elysia({ name : "Private routes" })
    .use(jwt({
        name: 'jwt',
        secret: process.env.JWT_KEY!,
    }))
    .guard({
        async beforeHandle({ jwt, request }) {
            const authHeader = request.headers.get('Authorization');
            let bearerToken: string | null = null;

            if (authHeader?.startsWith('Bearer ')) {
                bearerToken = authHeader.slice(7); // Remove "Bearer " prefix
            }

            if (!bearerToken) {
                return {
                    success: false,
                    status: 401,
                    message: "Unauthorized headers"
                }
            }

            await jwtCheck(bearerToken, jwt);
        }
    })
    .use(busesPlugin)
    .use(assistantsPlugin)
