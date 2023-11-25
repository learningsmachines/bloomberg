'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_virtual/_rollupPluginBabelHelpers.js');
var dom = require('./dom.js');

/**
 * Helpers to configure an intent button for modifying a list
 *
 * @see https://conform.guide/api/react#list
 */
var list = new Proxy({}, {
  get(_target, operation) {
    return function (name) {
      var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return {
        name: INTENT,
        value: "list/".concat(JSON.stringify(_rollupPluginBabelHelpers.objectSpread2({
          name,
          operation
        }, payload))),
        formNoValidate: true
      };
    };
  }
});
var INTENT = '__intent__';

/**
 * Returns the intent from the form data or search params.
 * It throws an error if multiple intent is set.
 */
function getIntent(payload) {
  if (!payload.has(INTENT)) {
    return 'submit';
  }
  var [intent, secondIntent, ...rest] = payload.getAll(INTENT);

  // The submitter value is included in the formData directly on Safari 15.6.
  // This causes the intent to be duplicated in the payload.
  // We will ignore the second intent if it is the same as the first one.
  if (typeof intent !== 'string' || secondIntent && intent !== secondIntent || rest.length > 0) {
    throw new Error('The intent could only be set on a button');
  }
  return intent;
}

/**
 * Returns the properties required to configure an intent button for validation
 *
 * @see https://conform.guide/api/react#validate
 */
function validate(field) {
  return {
    name: INTENT,
    value: "validate/".concat(field),
    formNoValidate: true
  };
}
function requestIntent(form, buttonProps) {
  if (!form) {
    // eslint-disable-next-line no-console
    console.warn('No form element is provided');
    return;
  }
  var submitter = dom.createSubmitter({
    name: INTENT,
    value: buttonProps.value,
    hidden: true,
    formNoValidate: buttonProps.formNoValidate
  });
  dom.requestSubmit(form, submitter);
}
function parseIntent(intent) {
  var seperatorIndex = intent.indexOf('/');
  if (seperatorIndex > -1) {
    var type = intent.slice(0, seperatorIndex);
    var _payload = intent.slice(seperatorIndex + 1);
    if (typeof _payload !== 'undefined') {
      try {
        switch (type) {
          case 'validate':
            return {
              type,
              payload: _payload
            };
          case 'list':
            return {
              type,
              payload: JSON.parse(_payload)
            };
        }
      } catch (error) {
        throw new Error("Failed parsing intent: ".concat(intent), {
          cause: error
        });
      }
    }
  }
  return null;
}
function updateList(list, payload) {
  var _payload$index;
  switch (payload.operation) {
    case 'prepend':
      list.unshift(payload.defaultValue);
      break;
    case 'append':
      list.push(payload.defaultValue);
      break;
    case 'insert':
      list.splice((_payload$index = payload.index) !== null && _payload$index !== void 0 ? _payload$index : list.length, 0, payload.defaultValue);
      break;
    case 'replace':
      list.splice(payload.index, 1, payload.defaultValue);
      break;
    case 'remove':
      list.splice(payload.index, 1);
      break;
    case 'reorder':
      list.splice(payload.to, 0, ...list.splice(payload.from, 1));
      break;
    default:
      throw new Error('Unknown list intent received');
  }
  return list;
}

exports.INTENT = INTENT;
exports.getIntent = getIntent;
exports.list = list;
exports.parseIntent = parseIntent;
exports.requestIntent = requestIntent;
exports.updateList = updateList;
exports.validate = validate;
