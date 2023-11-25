import { SDK_VERSION, init as init$1 } from '@sentry/browser';

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
        version: SDK_VERSION,
      },
    ],
    version: SDK_VERSION,
  };
  init$1(opts);
}

export { init };
//# sourceMappingURL=sdk.js.map
