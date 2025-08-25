import Elysia from "elysia";
import { loginValidation } from "../validators/login.valid";
import { xssStr } from "../secure/xss.secure";
import jwt from "@elysiajs/jwt";
import { AuthServices } from "../services/auth.service";

export const authPlugin = new Elysia({ name : "Auth Route" })
    .use(jwt({
        name: 'jwt',
        secret: process.env.JWT_KEY!,
    }))
    .post("/login", async ({ body, status, jwt }) => {

        const { username, password } = body;

        const result = await AuthServices.login(username, password, jwt);

        return status(result.status, result)
    }, {
        body: loginValidation.loginInsert,
        // sanitize inputs
        beforeHandle({ body }) {
            body.username = xssStr(body.username.trim().toLowerCase());
            body.password = xssStr(body.password.trim());
        }
    })