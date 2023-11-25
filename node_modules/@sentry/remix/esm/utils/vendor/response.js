/**
 * Based on Remix Implementation
 *
 * https://github.com/remix-run/remix/blob/7688da5c75190a2e29496c78721456d6e12e3abe/packages/remix-server-runtime/data.ts#L131-L145
 */
async function extractData(response) {
  const contentType = response.headers.get('Content-Type');

  // Cloning the response to avoid consuming the original body stream
  const responseClone = response.clone();

  if (contentType && /\bapplication\/json\b/.test(contentType)) {
    return responseClone.json();
  }

  return responseClone.text();
}

/**
 * Taken from Remix Implementation
 *
 * https://github.com/remix-run/remix/blob/32300ec6e6e8025602cea63e17a2201989589eab/packages/remix-server-runtime/responses.ts#L60-L77
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isResponse(value) {
  return (
    value != null &&
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    typeof value.status === 'number' &&
    typeof value.statusText === 'string' &&
    typeof value.headers === 'object' &&
    typeof value.body !== 'undefined'
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
  );
}

// https://github.com/remix-run/remix/blob/7688da5c75190a2e29496c78721456d6e12e3abe/packages/remix-server-runtime/responses.ts#L1-L4

/**
 * This is a shortcut for creating `application/json` responses. Converts `data`
 * to JSON and sets the `Content-Type` header.
 *
 * @see https://remix.run/api/remix#json
 *
 * https://github.com/remix-run/remix/blob/7688da5c75190a2e29496c78721456d6e12e3abe/packages/remix-server-runtime/responses.ts#L12-L24
 */
const json = (data, init = {}) => {
  const responseInit = typeof init === 'number' ? { status: init } : init;
  const headers = new Headers(responseInit.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json; charset=utf-8');
  }
  return new Response(JSON.stringify(data), {
    ...responseInit,
    headers,
  });
};

/**
 * Remix Implementation:
 * https://github.com/remix-run/remix/blob/38e127b1d97485900b9c220d93503de0deb1fc81/packages/remix-server-runtime/routeMatching.ts#L12-L24
 *
 * Changed so that `matchRoutes` function is passed in.
 */
function matchServerRoutes(
  routes,
  pathname,
  pkg,
) {
  if (!pkg) {
    return null;
  }

  const matches = pkg.matchRoutes(routes, pathname);
  if (!matches) {
    return null;
  }

  return matches.map(match => ({
    params: match.params,
    pathname: match.pathname,
    route: match.route,
  }));
}

/**
 * https://github.com/remix-run/remix/blob/97999d02493e8114c39d48b76944069d58526e8d/packages/remix-server-runtime/server.ts#L573-L586
 */
function isIndexRequestUrl(url) {
  for (const param of url.searchParams.getAll('index')) {
    // only use bare `?index` params without a value
    // ✅ /foo?index
    // ✅ /foo?index&index=123
    // ✅ /foo?index=123&index
    // ❌ /foo?index=123
    if (param === '') {
      return true;
    }
  }

  return false;
}

/**
 * https://github.com/remix-run/remix/blob/97999d02493e8114c39d48b76944069d58526e8d/packages/remix-server-runtime/server.ts#L588-L596
 */
function getRequestMatch(url, matches) {
  const match = matches.slice(-1)[0];

  if (!isIndexRequestUrl(url) && match.route.id.endsWith('/index')) {
    return matches.slice(-2)[0];
  }

  return match;
}

/**
 * https://github.com/remix-run/remix/blob/3e589152bc717d04e2054c31bea5a1056080d4b9/packages/remix-server-runtime/responses.ts#L75-L85
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isDeferredData(value) {
  const deferred = value;
  return (
    deferred &&
    typeof deferred === 'object' &&
    typeof deferred.data === 'object' &&
    typeof deferred.subscribe === 'function' &&
    typeof deferred.cancel === 'function' &&
    typeof deferred.resolveData === 'function'
  );
}

/**
 * https://github.com/remix-run/react-router/blob/f9b3dbd9cbf513366c456b33d95227f42f36da63/packages/router/utils.ts#L1574
 *
 * Check if the given error is an ErrorResponse generated from a 4xx/5xx
 * Response thrown from an action/loader
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isRouteErrorResponse(value) {
  const error = value;

  return (
    error != null &&
    typeof error.status === 'number' &&
    typeof error.statusText === 'string' &&
    typeof error.internal === 'boolean' &&
    'data' in error
  );
}

export { extractData, getRequestMatch, isDeferredData, isIndexRequestUrl, isResponse, isRouteErrorResponse, json, matchServerRoutes };
//# sourceMappingURL=response.js.map
