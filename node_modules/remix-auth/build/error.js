"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationError = void 0;
class AuthorizationError extends Error {
    constructor(message, cause) {
        super(message);
        this.cause = cause;
    }
}
exports.AuthorizationError = AuthorizationError;
