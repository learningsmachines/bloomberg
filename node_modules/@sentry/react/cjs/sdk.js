Object.defineProperty(exports, '__esModule', { value: true });

const browser = require('@sentry/browser');

/**
 * Inits the React SDK
 */
function init(options) {
  const opts = {
    _metadata: {} ,
    ...options,
  };

  opts._metadata.sdk = opts._metadata.sdk || {
    name: 'sentry.javascript.react',
    packages: [
      {
        name: 'npm:@sentry/react',
        version: browser.SDK_VERSION,
      },
    ],
    version: browser.SDK_VERSION,
  };
  browser.init(opts);
}

exports.init = init;
//# sourceMappingURL=sdk.js.map
