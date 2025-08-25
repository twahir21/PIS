import Elysia from "elysia";
import { BusDataValidation } from "../validators/bus.valid";
import { xssStr } from "../secure/xss.secure";
import { busServices } from "../services/bus.service";
import jwt from "@elysiajs/jwt";
import { jwtCheck } from "../secure/jwtcheck.secure";

// Deal with routing and data validations
export const busesPlugin = new Elysia({ name : "Buses crud" })
    .use(jwt({
        name: 'jwt',
        secret: process.env.JWT_KEY!
    }))
    .get("/buses", async({ status }) => {
        const result = await busServices.getBus();

        if (!result) return status(500, {
            success: false,
            status: 500,
            message: "Something went wrong in getting buses, try again"
        });

        return status(result.status, result);
    })
    .get("/buses/:id", async ({ params, status }) => {
        const result = await busServices.getOneBus(params.id);

        if (!result) return status(500, {
            success: false,
            status: 500,
            message: "Something went wrong in getting bus, try again"
        });

        return status(result.status, result);

    }, {
        params: BusDataValidation.busId,
        beforeHandle({ params }){
            // sanitize
            params.id = xssStr(params.id.trim());
        }
    })
    .put("/buses/:id", async ({ body, params, status, request, jwt }) => {
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
        const token = await jwtCheck(bearerToken, jwt);
        const result = await busServices.updateBus(body, params.id, token.role!);

        if (!result) return status(500, {
            success: false,
            status: 500,
            message: "Something went wrong in updating bus, try again"
        });

        return status(result.status, result);
    }, {
        body: BusDataValidation.busInsert,
        params: BusDataValidation.busId,
        beforeHandle({ body, params }){
            // sanitize
            body.plateNumber = xssStr(body.plateNumber.trim().toUpperCase());
            body.arrival = xssStr(body.arrival.trim());
            body.departure = xssStr(body.departure.trim());
            params.id = xssStr(params.id.trim());
        }
    })
    .guard({
        async beforeHandle({ request, jwt }){
            const authHeader = request.headers.get('authorization');
            let bearerToken: string | null = null;

            if (authHeader?.startsWith('Bearer ')) {
                bearerToken = authHeader.slice(7); // Remove "Bearer " prefix
            }
            const token = await jwtCheck(bearerToken!, jwt);

            if (token.role !== "admin" && token.role !== "assistant"){
                return {
                    status: 401,
                    message: "Unauthorized role"
                }
            }
        }
    })
    .post("/buses", async({ body, status }) => {

        const result = await busServices.createBus(body);

        if (!result) return status(500, {
            success: false,
            status: 500,
            message: "Something went wrong in registering bus, try again"
        })

        return status(result.status, result)

    }, {
        body: BusDataValidation.busInsert,

        beforeHandle({ body }){
            // sanitize
            body.plateNumber = xssStr(body.plateNumber.trim().toUpperCase());
            body.arrival = xssStr(body.arrival.trim());
            body.departure = xssStr(body.departure.trim());           
        }
    })
    .delete("buses/:id", async ({ params, status }) => {
        const result = await busServices.deleteBus(params.id);

        return status(result.status, result);
        
    }, {
        params: BusDataValidation.busId, 
        beforeHandle({ params }){
            // sanitize
            params.id = xssStr(params.id.trim());
        }
    })