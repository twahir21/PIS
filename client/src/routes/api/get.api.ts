import { serverLink } from "~/const/links.const";

export const getApi = {
    overview: async (token: string) => {
        const response = await fetch(`${serverLink}/overview`, {
            headers: { 
                "Content-Type": 'application/json',
                'Authorization': `Bearer ${token}`
            },
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
                totalBusOntime: number;
                totalBusDelayed: number
            }
          };
    },
    buses: async (token: string) => {
        const response = await fetch(`${serverLink}/buses`, {
        headers: { 
            "Content-Type": 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        credentials: "include",
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
            delayMinutes: number;
            delayHours: number
        }[]
        };
    },
    users: async (token: string) => {
        const response = await fetch(`${serverLink}/assistants`, {
            headers: { 
                "Content-Type": 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            credentials: "include",
        });

        return (await response.json()) as {
        success: boolean;
        status: number;
        message: string;
        data: {
            id: string;
            username: string;
            role: string;
            createdAt: string;
            lastActive: string;
        }[]
        }; 
    },
    activity: async (token: string) => {
          const response = await fetch(`${serverLink}/activities`, {
            headers: { 
                "Content-Type": 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            credentials: "include",
          });

          return (await response.json()) as {
            success: boolean;
            status: number;
            message: string;
            data: {
                id: string;
                activity: string;
                type: "created" | "updated" | "deleted";
                description: string;
                createdAt: string;
            }[]
          };
    }
}
