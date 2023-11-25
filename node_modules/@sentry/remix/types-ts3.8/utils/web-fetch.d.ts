import { RemixRequest } from './vendor/types';
/**
 * Vendored from:
 * https://github.com/remix-run/web-std-io/blob/f715b354c8c5b8edc550c5442dec5712705e25e7/packages/fetch/src/utils/get-search.js#L5
 */
export declare const getSearch: (parsedURL: URL) => string;
/**
 * Convert a Request to Node.js http request options.
 * The options object to be passed to http.request
 * Vendored / modified from:
 * https://github.com/remix-run/web-std-io/blob/f715b354c8c5b8edc550c5442dec5712705e25e7/packages/fetch/src/request.js#L259
 */
export declare const normalizeRemixRequest: (request: RemixRequest) => Record<string, any>;
//# sourceMappingURL=web-fetch.d.ts.map
