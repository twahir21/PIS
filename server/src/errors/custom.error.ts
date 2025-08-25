// custom error function used in Data validation
export function customErr (message: string): {
    success: boolean,
    message: string
} {
    return {
        success: false,
        message: message
    }
}