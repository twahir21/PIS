import { status } from "../const/statCode.const"

// Define catchError to do DRY principle.
export const catchError = async ( 
    error: unknown, 
    fallbackMessage: string
) : Promise<{
    success: boolean,
    status: typeof status.SERVER_ERROR,
    message: string
}> => {
    return {
        success: false,
        status: status.SERVER_ERROR,
        message: error instanceof Error 
                ? error.message
                : fallbackMessage
    }
}