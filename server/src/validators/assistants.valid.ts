import { t } from "elysia";
import { customErr } from "../errors/custom.error";

export const assistantValids = {
    insert: t.Object({
        username: t.String({
            minLength: 3,
            maxLength: 80,
            error() { return customErr("username sio sahihi.") }
        }),
        password: t.String({
            minLength: 3,
            maxLength: 80,
            error() { return customErr("password sio sahihi.") }
        }),
        role: t.Enum({
            assistant: "assistant",
            operator: "operator"
        }, {
            error() { return customErr("role sio sahihi.") }
        })
    }),
}