import { t } from "elysia";
import { customErr } from "../errors/custom.error";

export const BusDataValidation = {
    busInsert: t.Object({
        plateNumber: t.String({
            minLength: 3,
            maxLength: 11,
            error() { return customErr("Plate Number sio sahihi.") }
        }),
        from: t.Enum({
            Dar: "Dar Es Salaam",
            Iringa: "Iringa",
            Singida: "Singida",
            Dodoma: "Dodoma",
        }, {
            error() { return customErr ("Kuelekea, sio sahihi") }
        }),
        to: t.Enum({
            Dar: "Dar Es Salaam",
            Iringa: "Iringa",
            Singida: "Singida",
            Dodoma: "Dodoma",
        }, {
            error() { return customErr ("Kwenda, sio sahihi") }
        }),
        type: t.Enum({
            express: "express",
            normal: "normal",
            vip: "vip"
        }, {
            error() { return customErr ("Bus type sio sahihi") }
        }),
        
        departure: t.String(),
        arrival: t.String(),

        status: t.Enum({
            onTime: "ontime",
            delayed: "delayed",
            cancelled: "cancelled"
        }, {
            error() { return customErr ("Bus status sio sahihi") }
        }),

        station: t.Enum({
            manzese: "manzese"
        }, {
            error() { return customErr ("Bus station sio sahihi") }
        }),

        delayHours: t.Optional(
        t.String({
            minLength: 1,
            maxLength: 2,
            error() { return customErr("Delayed hours sio sahihi") }
        })
        ),

        delayMinutes: t.Optional(
        t.String({
            minLength: 1,
            maxLength: 2,
            error() { return customErr("Delayed minutes sio sahihi") }
        })
        ),

    }),
    busId: t.Object({
        id: t.String({
            minLength: 5,
            maxLength: 80,
            error() { return customErr ("Bus ID sio sahihi") }
        })
    })
}