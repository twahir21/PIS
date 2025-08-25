import type { JSONObject } from "@builder.io/qwik-city";
import { serverLink } from "~/const/links.const";

export const updateApi = {
    buses: async (body: JSONObject, token: string) => {
        const response = await fetch(`${serverLink}/buses/${body.id}`, {
        headers: { Accept: 'application/json',
            "Content-Type": 'application/json',
            'Authorization': `Bearer ${token}`
         },
        credentials: "include",
        method: "PUT",
        body: JSON.stringify(body)
        });

        return (await response.json()) as {
        success: boolean;
        status: number;
        message: string;
        data: {
            id: string;
            plateNumber: string;
            from: string;
            to: string;
            departure: string;
            arrival: string;
            station: string;
            type: string;
            status: string;
        }
        };
    }
}
