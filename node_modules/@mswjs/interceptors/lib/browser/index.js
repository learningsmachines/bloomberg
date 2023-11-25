"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _chunk3LFH2WCFjs = require('./chunk-3LFH2WCF.js');






var _chunkG5ORGOKHjs = require('./chunk-G5ORGOKH.js');

// src/BatchInterceptor.ts
var BatchInterceptor = class extends _chunkG5ORGOKHjs.Interceptor {
  constructor(options) {
    BatchInterceptor.symbol = Symbol(options.name);
    super(BatchInterceptor.symbol);
    this.interceptors = options.interceptors;
  }
  setup() {
    const logger = this.logger.extend("setup");
    logger.info("applying all %d interceptors...", this.interceptors.length);
    for (const interceptor of this.interceptors) {
      logger.info('applying "%s" interceptor...', interceptor.constructor.name);
      interceptor.apply();
      logger.info("adding interceptor dispose subscription");
      this.subscriptions.push(() => interceptor.dispose());
    }
  }
  on(event, listener) {
    for (const interceptor of this.interceptors) {
      interceptor.on(event, listener);
    }
    return this;
  }
  once(event, listener) {
    for (const interceptor of this.interceptors) {
      interceptor.once(event, listener);
    }
    return this;
  }
  off(event, listener) {
    for (const interceptor of this.interceptors) {
      interceptor.off(event, listener);
    }
    return this;
  }
  removeAllListeners(event) {
    for (const interceptors of this.interceptors) {
      interceptors.removeAllListeners(event);
    }
    return this;
  }
};

// src/utils/getCleanUrl.ts
function getCleanUrl(url, isAbsolute = true) {
  return [isAbsolute && url.origin, url.pathname].filter(Boolean).join("");
}










exports.BatchInterceptor = BatchInterceptor; exports.IS_PATCHED_MODULE = _chunkG5ORGOKHjs.IS_PATCHED_MODULE; exports.Interceptor = _chunkG5ORGOKHjs.Interceptor; exports.InterceptorReadyState = _chunkG5ORGOKHjs.InterceptorReadyState; exports.decodeBuffer = _chunk3LFH2WCFjs.decodeBuffer; exports.deleteGlobalSymbol = _chunkG5ORGOKHjs.deleteGlobalSymbol; exports.encodeBuffer = _chunk3LFH2WCFjs.encodeBuffer; exports.getCleanUrl = getCleanUrl; exports.getGlobalSymbol = _chunkG5ORGOKHjs.getGlobalSymbol;
