Object.defineProperty(exports, '__esModule', { value: true });

const utils = require('@sentry/utils');
const helpers = require('../helpers.js');
const utils$1 = require('./utils.js');

/**
 * Safety wrapper for startTransaction for the unlikely case that transaction starts before tracing is imported -
 * if that happens we want to avoid throwing an error from profiling code.
 * see https://github.com/getsentry/sentry-javascript/issues/4731.
 *
 * @experimental
 */
function onProfilingStartRouteTransaction(transaction) {
  if (!transaction) {
    if ((typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__)) {
      utils.logger.log('[Profiling] Transaction is undefined, skipping profiling');
    }
    return transaction;
  }

  if (utils$1.shouldProfileTransaction(transaction)) {
    return startProfileForTransaction(transaction);
  }

  return transaction;
}

/**
 * Wraps startTransaction and stopTransaction with profiling related logic.
 * startProfileForTransaction is called after the call to startTransaction in order to avoid our own code from
 * being profiled. Because of that same reason, stopProfiling is called before the call to stopTransaction.
 */
function startProfileForTransaction(transaction) {
  // Start the profiler and get the profiler instance.
  let startTimestamp;
  if (utils$1.isAutomatedPageLoadTransaction(transaction)) {
    startTimestamp = utils.timestampInSeconds() * 1000;
  }

  const profiler = utils$1.startJSSelfProfile();

  // We failed to construct the profiler, fallback to original transaction.
  // No need to log anything as this has already been logged in startProfile.
  if (!profiler) {
    return transaction;
  }

  if ((typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__)) {
    utils.logger.log(`[Profiling] started profiling transaction: ${transaction.name || transaction.description}`);
  }

  // We create "unique" transaction names to avoid concurrent transactions with same names
  // from being ignored by the profiler. From here on, only this transaction name should be used when
  // calling the profiler methods. Note: we log the original name to the user to avoid confusion.
  const profileId = utils.uuid4();

  /**
   * Idempotent handler for profile stop
   */
  async function onProfileHandler() {
    // Check if the profile exists and return it the behavior has to be idempotent as users may call transaction.finish multiple times.
    if (!transaction) {
      return null;
    }
    // Satisfy the type checker, but profiler will always be defined here.
    if (!profiler) {
      return null;
    }

    return profiler
      .stop()
      .then((profile) => {
        if (maxDurationTimeoutID) {
          helpers.WINDOW.clearTimeout(maxDurationTimeoutID);
          maxDurationTimeoutID = undefined;
        }

        if ((typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__)) {
          utils.logger.log(`[Profiling] stopped profiling of transaction: ${transaction.name || transaction.description}`);
        }

        // In case of an overlapping transaction, stopProfiling may return null and silently ignore the overlapping profile.
        if (!profile) {
          if ((typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__)) {
            utils.logger.log(
              `[Profiling] profiler returned null profile for: ${transaction.name || transaction.description}`,
              'this may indicate an overlapping transaction or a call to stopProfiling with a profile title that was never started',
            );
          }
          return null;
        }

        utils$1.addProfileToGlobalCache(profileId, profile);
        return null;
      })
      .catch(error => {
        if ((typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__)) {
          utils.logger.log('[Profiling] error while stopping profiler:', error);
        }
        return null;
      });
  }

  // Enqueue a timeout to prevent profiles from running over max duration.
  let maxDurationTimeoutID = helpers.WINDOW.setTimeout(() => {
    if ((typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__)) {
      utils.logger.log(
        '[Profiling] max profile duration elapsed, stopping profiling for:',
        transaction.name || transaction.description,
      );
    }
    // If the timeout exceeds, we want to stop profiling, but not finish the transaction
    void onProfileHandler();
  }, utils$1.MAX_PROFILE_DURATION_MS);

  // We need to reference the original finish call to avoid creating an infinite loop
  const originalFinish = transaction.finish.bind(transaction);

  /**
   * Wraps startTransaction and stopTransaction with profiling related logic.
   * startProfiling is called after the call to startTransaction in order to avoid our own code from
   * being profiled. Because of that same reason, stopProfiling is called before the call to stopTransaction.
   */
  function profilingWrappedTransactionFinish() {
    if (!transaction) {
      return originalFinish();
    }
    // onProfileHandler should always return the same profile even if this is called multiple times.
    // Always call onProfileHandler to ensure stopProfiling is called and the timeout is cleared.
    void onProfileHandler().then(
      () => {
        transaction.setContext('profile', { profile_id: profileId, start_timestamp: startTimestamp });
        originalFinish();
      },
      () => {
        // If onProfileHandler fails, we still want to call the original finish method.
        originalFinish();
      },
    );

    return transaction;
  }

  transaction.finish = profilingWrappedTransactionFinish;
  return transaction;
}

exports.onProfilingStartRouteTransaction = onProfilingStartRouteTransaction;
exports.startProfileForTransaction = startProfileForTransaction;
//# sourceMappingURL=hubextensions.js.map
