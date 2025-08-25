import type { JSONObject } from "@builder.io/qwik-city";
import { serverLink } from "~/const/links.const";

export const createApi = {
    overview: async () => {
        const response = await fetch(`${serverLink}/overview`, {
            headers: { Accept: 'application/json' },
            credentials: "include",
          });

          return (await response.json()) as {
            success: boolean;
            status: number;
            message: string;
            data: {
                totalBuses: number;
                totalOperators: number;
                totalAssistants: number;
            }
          };
    },
    buses: async (data: JSONObject, token: string) => {
        const response = await fetch(`${serverLink}/buses`, {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            method: 'POST',
            body: JSON.stringify(data),
            credentials: "include"
        });

        return (await response.json()) as {
        success: boolean;
        status: number;
        message: string;
        };
    },
    users: async (data: JSONObject, token: string) => {
        if (data.username === '' || data.password === '' || data.role === '') {
            return {
                success: false,
                status: 400,
                message: "Username and password are required",
            }
        }

        try {
            const response = await fetch(`${serverLink}/assistants`, {
                method: 'POST',
                credentials: "include",
                headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                 },
                body: JSON.stringify(data),
            });

            return (await response.json()) as {
                success: boolean;
                status: number;
                message: string;
            };
        } catch (error) {
            return {
                success: false,
                status: 500,
                message: error instanceof Error
                    ? error.message
                    : "error in creating user",
            }
        }
    },
    login: async (data: JSONObject) => {
        if (data.username === '' || data.password === '') {
            return {
                success: false,
                status: 400,
                message: "Username and password are required",
                role: "",
                username: "",
                token: ""
            }
        }

        try {
            const response = await fetch(`${serverLink}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            
            return result as {
                success: boolean;
                status: number;
                message: string;
                token: string;
                role: string
                username: string
            };
        } catch (error) {
            return {
                success: false,
                status: 500,
                role: "",
                username: "",
                token: "",
                message: error instanceof Error
                    ? error.message
                    : "error in login user",
            }
        }
        }
}
