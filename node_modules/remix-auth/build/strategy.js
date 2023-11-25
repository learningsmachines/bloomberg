"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Strategy = void 0;
const server_runtime_1 = require("@remix-run/server-runtime");
const error_1 = require("./error");
/**
 * The Strategy class is the base class every strategy should extend.
 *
 * This class receives two generics, a User and a VerifyParams.
 * - User is the type of the user data.
 * - VerifyParams is the type of the params the verify callback will receive from the strategy.
 *
 * This class also defines as protected two methods, `success` and `failure`.
 * - `success` is called when the authentication was successful.
 * - `failure` is called when the authentication failed.
 * These methods helps you return or throw the correct value, response or error
 * from within the strategy `authenticate` method.
 */
class Strategy {
    constructor(verify) {
        this.verify = verify;
    }
    /**
     * Throw an AuthorizationError or a redirect to the failureRedirect.
     * @param message The error message to set in the session.
     * @param request The request to get the cookie out of.
     * @param sessionStorage The session storage to retrieve the session from.
     * @param options The strategy options.
     * @throws {AuthorizationError} If the throwOnError is set to true.
     * @throws {Response} If the failureRedirect is set or throwOnError is false.
     * @returns {Promise<never>}
     */
    async failure(message, request, sessionStorage, options, cause) {
        // if a failureRedirect is not set, we throw a 401 Response or an error
        if (!options.failureRedirect) {
            if (options.throwOnError)
                throw new error_1.AuthorizationError(message, cause);
            throw (0, server_runtime_1.json)({ message }, 401);
        }
        let session = await sessionStorage.getSession(request.headers.get("Cookie"));
        // if we do have a failureRedirect, we redirect to it and set the error
        // in the session errorKey
        session.flash(options.sessionErrorKey, { message });
        throw (0, server_runtime_1.redirect)(options.failureRedirect, {
            headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
        });
    }
    /**
     * Returns the user data or throw a redirect to the successRedirect.
     * @param user The user data to set in the session.
     * @param request The request to get the cookie out of.
     * @param sessionStorage The session storage to retrieve the session from.
     * @param options The strategy options.
     * @returns {Promise<User>} The user data.
     * @throws {Response} If the successRedirect is set, it will redirect to it.
     */
    async success(user, request, sessionStorage, options) {
        var _a;
        // if a successRedirect is not set, we return the user
        if (!options.successRedirect)
            return user;
        let session = await sessionStorage.getSession(request.headers.get("Cookie"));
        // if we do have a successRedirect, we redirect to it and set the user
        // in the session sessionKey
        session.set(options.sessionKey, user);
        session.set(options.sessionStrategyKey, (_a = options.name) !== null && _a !== void 0 ? _a : this.name);
        throw (0, server_runtime_1.redirect)(options.successRedirect, {
            headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
        });
    }
}
exports.Strategy = Strategy;
