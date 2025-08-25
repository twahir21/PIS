// 4xx means client error
// 5xx means server error
// 2xx means success

export const status = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403, // role permission issue
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    CREATED: 201,
    NO_CONTENT: 204,
    METHOD_NOT_ALLOWED: 405,    
    CONFLICT: 409, // data already exist
    UNPROCESSABLE_ENTITY: 422, // validation error
    TOO_MANY_REQUESTS: 429,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504
}