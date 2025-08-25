import type { JSONObject } from "@builder.io/qwik-city";
import { serverLink } from "~/const/links.const";

export const deleteApi = {
    users: async (id: JSONObject, token: string) => {
        const response = await fetch(`${serverLink}/assistants/${id.deleteId}`, {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: "include",
        method: "DELETE"
        });

        return (await response.json()) as {
            success: boolean;
            status: number;
            message: string;
        };
    },
    buses: async (id: JSONObject, token: string) => {
        const response = await fetch(`${serverLink}/buses/${id.deleteId}`, {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: "include",
        method: "DELETE"
        });

        return (await response.json()) as {
            success: boolean;
            status: number;
            message: string;
        };
    }
}
