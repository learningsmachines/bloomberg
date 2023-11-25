"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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
var native_exports = {};
__export(native_exports, {
  setupServer: () => setupServer
});
module.exports = __toCommonJS(native_exports);
var import_XMLHttpRequest = require("@mswjs/interceptors/XMLHttpRequest");

// src/node/SetupServerApi.ts
var import_outvariant = require("outvariant");
var import_interceptors = require("@mswjs/interceptors");
var import_SetupApi = require("../core/SetupApi.js");
var import_mergeRight = require("../core/utils/internal/mergeRight.js");
var import_handleRequest = require("../core/utils/handleRequest.js");
var import_devUtils = require("../core/utils/internal/devUtils.js");

// src/node/utils/isNodeExceptionLike.ts
function isNodeExceptionLike(error) {
  return !!error && typeof error === "object" && "code" in error;
}

// src/node/SetupServerApi.ts
var DEFAULT_LISTEN_OPTIONS = {
  onUnhandledRequest: "warn"
};
var SetupServerApi = class extends import_SetupApi.SetupApi {
  constructor(interceptors, ...handlers) {
    super(...handlers);
    this.context = this.createContext();
    this.interceptor = new import_interceptors.BatchInterceptor({
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
      const response = yield (0, import_handleRequest.handleRequest)(
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
    this.resolvedOptions = (0, import_mergeRight.mergeRight)(
      DEFAULT_LISTEN_OPTIONS,
      options
    );
    this.interceptor.apply();
    this.subscriptions.push(() => {
      this.interceptor.dispose();
    });
    (0, import_outvariant.invariant)(
      [import_interceptors.InterceptorReadyState.APPLYING, import_interceptors.InterceptorReadyState.APPLIED].includes(
        this.interceptor.readyState
      ),
      import_devUtils.devUtils.formatMessage(
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
  return new SetupServerApi([import_XMLHttpRequest.XMLHttpRequestInterceptor], ...handlers);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  setupServer
});
