"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRobotsTxt = void 0;
const utils_1 = require("./utils");
const defaultPolicies = [
    {
        type: "userAgent",
        value: "*",
    },
    {
        type: "allow",
        value: "/",
    },
];
async function generateRobotsTxt(policies = [], { appendOnDefaultPolicies = true, headers } = {}) {
    const policiesToUse = appendOnDefaultPolicies
        ? [...defaultPolicies, ...policies]
        : policies;
    const robotText = await (0, utils_1.getRobotsText)(policiesToUse);
    const bytes = new TextEncoder().encode(robotText).byteLength;
    return new Response(robotText, {
        headers: {
            ...headers,
            "Content-Type": "text/plain",
            "Content-Length": String(bytes),
        },
    });
}
exports.generateRobotsTxt = generateRobotsTxt;
