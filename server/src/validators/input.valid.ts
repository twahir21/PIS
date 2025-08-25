import { t } from "elysia";
import { customErr } from "../errors/custom.error";

export const inputValid = {
    id: t.Object({
        id: t.String({
            minLength: 5,
            maxLength: 80,
            error() { return customErr ("ID sio sahihi") }
        })
    })
}