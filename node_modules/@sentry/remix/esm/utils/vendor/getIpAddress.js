import { _optionalChain } from '@sentry/utils';
import { isIP } from 'net';

/**
 * Get the IP address of the client sending a request.
 *
 * It receives a Request headers object and use it to get the
 * IP address from one of the following headers in order.
 *
 * - X-Client-IP
 * - X-Forwarded-For
 * - Fly-Client-IP
 * - CF-Connecting-IP
 * - Fastly-Client-Ip
 * - True-Client-Ip
 * - X-Real-IP
 * - X-Cluster-Client-IP
 * - X-Forwarded
 * - Forwarded-For
 * - Forwarded
 *
 * If the IP address is valid, it will be returned. Otherwise, null will be
 * returned.
 *
 * If the header values contains more than one IP address, the first valid one
 * will be returned.
 */
function getClientIPAddress(headers) {
  // The headers to check, in priority order
  const headerNames = [
    'X-Client-IP',
    'X-Forwarded-For',
    'Fly-Client-IP',
    'CF-Connecting-IP',
    'Fastly-Client-Ip',
    'True-Client-Ip',
    'X-Real-IP',
    'X-Cluster-Client-IP',
    'X-Forwarded',
    'Forwarded-For',
    'Forwarded',
  ];

  // This will end up being Array<string | string[] | undefined | null> because of the various possible values a header
  // can take
  const headerValues = headerNames.map((headerName) => {
    const value = headers.get(headerName);

    if (headerName === 'Forwarded') {
      return parseForwardedHeader(value);
    }

    return _optionalChain([value, 'optionalAccess', _ => _.split, 'call', _2 => _2(','), 'access', _3 => _3.map, 'call', _4 => _4((v) => v.trim())]);
  });

  // Flatten the array and filter out any falsy entries
  const flattenedHeaderValues = headerValues.reduce((acc, val) => {
    if (!val) {
      return acc;
    }

    return acc.concat(val);
  }, []);

  // Find the first value which is a valid IP address, if any
  const ipAddress = flattenedHeaderValues.find(ip => ip !== null && isIP(ip));

  return ipAddress || null;
}

function parseForwardedHeader(value) {
  if (!value) {
    return null;
  }

  for (const part of value.split(';')) {
    if (part.startsWith('for=')) {
      return part.slice(4);
    }
  }

  return null;
}

export { getClientIPAddress };
//# sourceMappingURL=getIpAddress.js.map
