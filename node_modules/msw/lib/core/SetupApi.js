"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var SetupApi_exports = {};
__export(SetupApi_exports, {
  SetupApi: () => SetupApi
});
module.exports = __toCommonJS(SetupApi_exports);
var import_outvariant = require("outvariant");
var import_strict_event_emitter = require("strict-event-emitter");
var import_devUtils = require("./utils/internal/devUtils.js");
var import_pipeEvents = require("./utils/internal/pipeEvents.js");
var import_toReadonlyArray = require("./utils/internal/toReadonlyArray.js");
var import_Disposable = require("./utils/internal/Disposable.js");
class SetupApi extends import_Disposable.Disposable {
  constructor(...initialHandlers) {
    super();
    this.validateHandlers(...initialHandlers);
    this.initialHandlers = (0, import_toReadonlyArray.toReadonlyArray)(initialHandlers);
    this.currentHandlers = [...initialHandlers];
    this.emitter = new import_strict_event_emitter.Emitter();
    this.publicEmitter = new import_strict_event_emitter.Emitter();
    (0, import_pipeEvents.pipeEvents)(this.emitter, this.publicEmitter);
    this.events = this.createLifeCycleEvents();
    this.subscriptions.push(() => {
      this.emitter.removeAllListeners();
      this.publicEmitter.removeAllListeners();
    });
  }
  validateHandlers(...handlers) {
    for (const handler of handlers) {
      (0, import_outvariant.invariant)(
        !Array.isArray(handler),
        import_devUtils.devUtils.formatMessage(
          'Failed to construct "%s" given an Array of request handlers. Make sure you spread the request handlers when calling the respective setup function.'
        ),
        this.constructor.name
      );
    }
  }
  use(...runtimeHandlers) {
    this.currentHandlers.unshift(...runtimeHandlers);
  }
  restoreHandlers() {
    this.currentHandlers.forEach((handler) => {
      handler.isUsed = false;
    });
  }
  resetHandlers(...nextHandlers) {
    this.currentHandlers = nextHandlers.length > 0 ? [...nextHandlers] : [...this.initialHandlers];
  }
  listHandlers() {
    return (0, import_toReadonlyArray.toReadonlyArray)(this.currentHandlers);
  }
  createLifeCycleEvents() {
    return {
      on: (...args) => {
        return this.publicEmitter.on(...args);
      },
      removeListener: (...args) => {
        return this.publicEmitter.removeListener(...args);
      },
      removeAllListeners: (...args) => {
        return this.publicEmitter.removeAllListeners(...args);
      }
    };
  }
}
