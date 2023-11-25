"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRobotsText = void 0;
const typeTextMap = {
    userAgent: "User-agent",
    allow: "Allow",
    disallow: "Disallow",
    sitemap: "Sitemap",
    crawlDelay: "Crawl-delay",
};
function getRobotsText(policies) {
    return policies.reduce((acc, policy) => {
        const { type, value } = policy;
        return `${acc}${typeTextMap[type]}: ${value}\n`;
    }, "");
}
exports.getRobotsText = getRobotsText;
