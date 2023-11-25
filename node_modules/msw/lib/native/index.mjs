var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/native/index.ts
import { XMLHttpRequestInterceptor } from "@mswjs/interceptors/XMLHttpRequest";

// src/node/SetupServerApi.ts
import { invariant } from "outvariant";
import {
  BatchInterceptor,
  InterceptorReadyState
} from "@mswjs/interceptors";
import { SetupApi } from '../core/SetupApi.mjs';
import { mergeRight } from '../core/utils/internal/mergeRight.mjs';
import { handleRequest } from '../core/utils/handleRequest.mjs';
import { devUtils } from '../core/utils/internal/devUtils.mjs';

// src/node/utils/isNodeExceptionLike.ts
function isNodeExceptionLike(error) {
  return !!error && typeof error === "object" && "code" in error;
}

// src/node/SetupServerApi.ts
var DEFAULT_LISTEN_OPTIONS = {
  onUnhandledRequest: "warn"
};
var SetupServerApi = class extends SetupApi {
  constructor(interceptors, ...handlers) {
    super(...handlers);
    this.context = this.createContext();
    this.interceptor = new BatchInterceptor({
      name: "setup-server",
      interceptors: interceptors.map((Interceptor2) => new Interceptor2())
    });
    this.resolvedOptions = {};
    this.init();
  }
  createContext() {
    return {
      get nodeEvents() {
        return import("events").then((events) => events).catch(() => void 0);
      }
    };
  }
  /**
   * Subscribe to all requests that are using the interceptor object
   */
  init() {
    this.interceptor.on("request", (_0) => __async(this, [_0], function* ({ request, requestId }) {
      yield this.setRequestAbortSignalMaxListeners(request);
      const response = yield handleRequest(
        request,
        requestId,
        this.currentHandlers,
        this.resolvedOptions,
        this.emitter
      );
      if (response) {
        request.respondWith(response);
      }
      return;
    }));
    this.interceptor.on(
      "response",
      ({ response, isMockedResponse, request, requestId }) => {
        this.emitter.emit(
          isMockedResponse ? "response:mocked" : "response:bypass",
          {
            response,
            request,
            requestId
          }
        );
      }
    );
  }
  listen(options = {}) {
    this.resolvedOptions = mergeRight(
      DEFAULT_LISTEN_OPTIONS,
      options
    );
    this.interceptor.apply();
    this.subscriptions.push(() => {
      this.interceptor.dispose();
    });
    invariant(
      [InterceptorReadyState.APPLYING, InterceptorReadyState.APPLIED].includes(
        this.interceptor.readyState
      ),
      devUtils.formatMessage(
        'Failed to start "setupServer": the interceptor failed to apply. This is likely an issue with the library and you should report it at "%s".'
      ),
      "https://github.com/mswjs/msw/issues/new/choose"
    );
  }
  close() {
    this.dispose();
  }
  /**
   * Bump the maximum number of event listeners on the
   * request's "AbortSignal". This prepares the request
   * for each request handler cloning it at least once.
   * Note that cloning a request automatically appends a
   * new "abort" event listener to the parent request's
   * "AbortController" so if the parent aborts, all the
   * clones are automatically aborted.
   */
  setRequestAbortSignalMaxListeners(request) {
    return __async(this, null, function* () {
      const events = yield this.context.nodeEvents;
      if (typeof events === "undefined") {
        return;
      }
      const { setMaxListeners, defaultMaxListeners } = events;
      if (typeof setMaxListeners !== "function") {
        return;
      }
      try {
        setMaxListeners(
          Math.max(defaultMaxListeners, this.currentHandlers.length),
          request.signal
        );
      } catch (error) {
        if (!(isNodeExceptionLike(error) && error.code === "ERR_INVALID_ARG_TYPE")) {
          throw error;
        }
      }
    });
  }
};

// src/native/index.ts
function setupServer(...handlers) {
  return new SetupServerApi([XMLHttpRequestInterceptor], ...handlers);
}
export {
  setupServer
};
