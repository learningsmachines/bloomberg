"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeSlashes = exports.createRouteId = exports.defineRoutes = void 0;
const path = __importStar(require("path"));
/**
 * A function for defining routes programmatically, instead of using the
 * filesystem convention.
 */
function defineRoutes(callback) {
    let routes = Object.create(null);
    let parentRoutes = [];
    let alreadyReturned = false;
    let defineRoute = (path, file, optionsOrChildren, children) => {
        if (alreadyReturned) {
            throw new Error('You tried to define routes asynchronously but started defining ' +
                'routes before the async work was done. Please await all async ' +
                'data before calling `defineRoutes()`');
        }
        let options;
        if (typeof optionsOrChildren === 'function') {
            // route(path, file, children)
            options = {};
            children = optionsOrChildren;
        }
        else {
            // route(path, file, options, children)
            // route(path, file, options)
            options = optionsOrChildren || {};
        }
        let route = {
            path: path ? path : undefined,
            index: options.index ? true : undefined,
            caseSensitive: options.caseSensitive ? true : undefined,
            id: options.id || createRouteId(file),
            parentId: parentRoutes.length > 0
                ? parentRoutes[parentRoutes.length - 1].id
                : 'root',
            file,
        };
        if (route.id in routes) {
            throw new Error(`Unable to define routes with duplicate route id: "${route.id}"`);
        }
        routes[route.id] = route;
        if (children) {
            parentRoutes.push(route);
            children();
            parentRoutes.pop();
        }
    };
    callback(defineRoute);
    alreadyReturned = true;
    return routes;
}
exports.defineRoutes = defineRoutes;
function createRouteId(file) {
    return normalizeSlashes(stripFileExtension(file));
}
exports.createRouteId = createRouteId;
function normalizeSlashes(file) {
    return file.split(path.win32.sep).join('/');
}
exports.normalizeSlashes = normalizeSlashes;
function stripFileExtension(file) {
    return file.replace(/\.[a-z0-9]+$/i, '');
}
