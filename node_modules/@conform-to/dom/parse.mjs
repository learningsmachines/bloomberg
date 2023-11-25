import { objectSpread2 as _objectSpread2 } from './_virtual/_rollupPluginBabelHelpers.mjs';
import { resolve, setValue } from './formdata.mjs';
import { getIntent, parseIntent, updateList, INTENT } from './intent.mjs';

var VALIDATION_UNDEFINED = '__undefined__';
var VALIDATION_SKIPPED = '__skipped__';
function parse(payload, options) {
  var submission = {
    intent: getIntent(payload),
    payload: resolve(payload, {
      ignoreKeys: [INTENT]
    }),
    error: {}
  };
  var intent = parseIntent(submission.intent);
  if (intent && intent.type === 'list') {
    setValue(submission.payload, intent.payload.name, list => {
      if (typeof list !== 'undefined' && !Array.isArray(list)) {
        throw new Error('The list intent can only be applied to a list');
      }
      return updateList(list !== null && list !== void 0 ? list : [], intent.payload);
    });
  }
  if (typeof (options === null || options === void 0 ? void 0 : options.resolve) === 'undefined') {
    return submission;
  }
  var result = options.resolve(submission.payload, submission.intent);
  var mergeResolveResult = resolved => {
    return _objectSpread2(_objectSpread2({}, submission), resolved);
  };
  if (result instanceof Promise) {
    return result.then(mergeResolveResult);
  }
  return mergeResolveResult(result);
}

export { VALIDATION_SKIPPED, VALIDATION_UNDEFINED, parse };
