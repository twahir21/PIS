import { busModels } from "../models/buses.model"

export const busServices = {
    createBus: async (
        body: {
            plateNumber: string,
            from: "Dar Es Salaam" | "Iringa" | "Singida" | "Dodoma",
            to: "Dodoma" | "Dar Es Salaam" | "Iringa" | "Singida",
            arrival: string,
            departure: string,
            status: "ontime" | "delayed" | "cancelled",
            station: "manzese",
            type: "express" | "normal" | "vip"
            delayedHours?: string,
            delayedMinutes?: string
        }
    ) => {
        return await busModels.createBus(body);
    }, 

    getBus: async (

    ) => {
        return await busModels.read();
    },

    getOneBus: async (
        id: string
    ) => {
        return await busModels.readOne(id);
    },

    updateBus: async (
        body: {
            plateNumber: string,
            from: "Dar Es Salaam" | "Iringa" | "Singida" | "Dodoma",
            to: "Dodoma" | "Dar Es Salaam" | "Iringa" | "Singida",
            arrival: string,
            departure: string,
            status: "ontime" | "delayed" | "cancelled",
            station: "manzese",
            type: "express" | "normal" | "vip",
            delayedHours?: string,
            delayedMinutes?: string
        },
        id: string,
        role: string
    ) => {
        const result = await busModels.update(body, id, role);

        if (!result) return {
            success: false,
            status: 500,
            message: "Bus Id is not correct or something went wrong, try again"
        }

        return result;
    },

    deleteBus: async (
        id: string
    ) => {
        const result = await busModels.delete(id);

        if (!result) return {
            success: false,
            status: 500,
            message: "Bus Id is not correct or something went wrong, try again"
        }

        return result;
    }
}