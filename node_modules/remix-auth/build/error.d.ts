export declare class AuthorizationError extends Error {
    cause?: Error | undefined;
    constructor(message?: string, cause?: Error | undefined);
}
