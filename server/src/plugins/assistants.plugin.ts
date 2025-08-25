import Elysia from "elysia";
import { assistantServices } from "../services/assistants.service";
import { inputValid } from "../validators/input.valid";
import { xssStr } from "../secure/xss.secure";
import { assistantValids } from "../validators/assistants.valid";
import jwt from "@elysiajs/jwt";
import { jwtCheck } from "../secure/jwtcheck.secure";

export const assistantsPlugin = new Elysia({ name : "Assistants" })
    .use(jwt({
        name: 'jwt',
        secret: process.env.JWT_KEY!,
    }))
    .get("/assistants", async({ status }) => {
        const result = await assistantServices.get();

        if (!result) return status(500, {
            success: false,
            status: 500,
            message: "Something went wrong in getting assistants, try again"
        });

        return status(result.status, result);
    })
    .get("/assistants/:id", async ({ params, status }) => {
        const result = await assistantServices.getOne(params.id);

        if (!result) return status(500, {
            success: false,
            status: 500,
            message: "Something went wrong in getting assistant, try again"
        });

        return status(result.status, result);

    }, {
        params: inputValid.id,
        beforeHandle({ params }){
            // sanitize
            params.id = xssStr(params.id.trim());
        }
    })
    .guard({
        async beforeHandle({ jwt, request }) {
            const authHeader = request.headers.get('authorization');
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

            const token = await jwtCheck(bearerToken, jwt);

            if (token.role !== "admin"){
                return {
                    success: false,
                    status: 401,
                    message: "Only admin can use this service"
                }
            }
        }
    })    
    .put("/assistants/:id", async ({ body, params, status }) => {
        const result = await assistantServices.update(body, params.id);

        if (!result) return status(500, {
            success: false,
            status: 500,
            message: "Something went wrong in updating assistant, try again"
        });

        return status(result.status, result);
    }, {
        body: assistantValids.insert,
        params: inputValid.id,
        beforeHandle({ body, params }){
            // sanitize
            body.username = xssStr(body.username.trim());
            body.password = xssStr(body.password.trim());
            params.id = xssStr(params.id.trim());
        }
    })
    .post("/assistants", async({ body, status }) => {

        const result = await assistantServices.create(body);

        if (!result) return status(500, {
            success: false,
            status: 500,
            message: "Something went wrong in registering assistants, try again"
        })

        return status(result.status, result)

    }, {
        body: assistantValids.insert,

        beforeHandle({ body }){
            // sanitize
            body.username = xssStr(body.username.trim().toLowerCase());
            body.password = xssStr(body.password.trim());            
        }
    })
    .delete("/assistants/:id", async ({ params, status }) => {
        const result = await assistantServices.delete(params.id);

        return status(result.status, result);
        
    }, {
        params: inputValid.id, 
        beforeHandle({ params }){
            // sanitize
            params.id = xssStr(params.id.trim());
        }
    })