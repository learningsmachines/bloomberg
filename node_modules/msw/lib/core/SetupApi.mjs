import { invariant } from "outvariant";
import { Emitter } from "strict-event-emitter";
import { devUtils } from './utils/internal/devUtils.mjs';
import { pipeEvents } from './utils/internal/pipeEvents.mjs';
import { toReadonlyArray } from './utils/internal/toReadonlyArray.mjs';
import { Disposable } from './utils/internal/Disposable.mjs';
class SetupApi extends Disposable {
  constructor(...initialHandlers) {
    super();
    this.validateHandlers(...initialHandlers);
    this.initialHandlers = toReadonlyArray(initialHandlers);
    this.currentHandlers = [...initialHandlers];
    this.emitter = new Emitter();
    this.publicEmitter = new Emitter();
    pipeEvents(this.emitter, this.publicEmitter);
    this.events = this.createLifeCycleEvents();
    this.subscriptions.push(() => {
      this.emitter.removeAllListeners();
      this.publicEmitter.removeAllListeners();
    });
  }
  validateHandlers(...handlers) {
    for (const handler of handlers) {
      invariant(
        !Array.isArray(handler),
        devUtils.formatMessage(
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
    return toReadonlyArray(this.currentHandlers);
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
export {
  SetupApi
};
