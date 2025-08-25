import { assistantModels } from "../models/assistants.model";

export const assistantServices = {
    create: async (
        body: {
            username: string,
            password: string,
            role: "assistant" | "operator"
        }
    ) => {
        return await assistantModels.createAssistant(body);
    }, 

    get: async (

    ) => {
        return await assistantModels.readAssistants();
    },

    getOne: async (
        id: string
    ) => {
        return await assistantModels.readOne(id);
    },

    update: async (
        body: {
            username: string,
            password: string,
            role: "assistant" | "operator"
        },
        id: string
    ) => {
        const result = await assistantModels.update(body, id);

        if (!result) return {
            success: false,
            status: 500,
            message: "User Id is not correct or something went wrong, try again"
        }

        return result;
    },

    delete: async (
        id: string
    ) => {
        const result = await assistantModels.delete(id);

        if (!result) return {
            success: false,
            status: 500,
            message: "User Id is not correct or something went wrong, try again"
        }

        return result;
    }
}