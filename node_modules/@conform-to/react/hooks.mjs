import { objectSpread2 as _objectSpread2 } from './_virtual/_rollupPluginBabelHelpers.mjs';
import { parseIntent, getFormData, parse, VALIDATION_UNDEFINED, VALIDATION_SKIPPED, getFormAction, getFormEncType, getFormMethod, getPaths, getName, isFieldElement, getErrors, getFormControls, getFormElement, updateList, getValidationMessage, focusFirstInvalidControl, isFocusableFormControl, requestIntent, validate } from '@conform-to/dom';
import { useState, useMemo, useEffect, useRef, useCallback, useLayoutEffect } from 'react';

/**
 * Properties to be applied to the form element
 */

function useNoValidate(defaultNoValidate, validateBeforeHydrate) {
  var [noValidate, setNoValidate] = useState(defaultNoValidate || !validateBeforeHydrate);
  useEffect(() => {
    setNoValidate(true);
  }, []);
  return noValidate;
}
function useFormRef(userProvidedRef) {
  var formRef = useRef(null);
  return userProvidedRef !== null && userProvidedRef !== void 0 ? userProvidedRef : formRef;
}
function useConfigRef(config) {
  var ref = useRef(config);
  useSafeLayoutEffect(() => {
    ref.current = config;
  });
  return ref;
}
function useFormReporter(ref, lastSubmission) {
  var [submission, setSubmission] = useState(lastSubmission);
  var report = useCallback((form, submission) => {
    var event = new CustomEvent('conform', {
      detail: submission.intent
    });
    form.dispatchEvent(event);
    setSubmission(submission);
  }, []);
  useEffect(() => {
    var form = ref.current;
    if (!form || !lastSubmission) {
      return;
    }
    if (!lastSubmission.payload) {
      // If the default value is empty, we can safely reset the form.
      // This ensure the behavior is consistent with and without JS.
      form.reset();

      // There is no need to report the submission anymore.
      return;
    }
    report(form, lastSubmission);
  }, [ref, lastSubmission, report]);
  useEffect(() => {
    var form = ref.current;
    if (!form || !submission) {
      return;
    }
    reportSubmission(form, submission);
  }, [ref, submission]);
  return report;
}
function useFormError(ref, config) {
  var [error, setError] = useState(() => {
    if (!config.initialError) {
      return {};
    }
    var result = {};
    for (var [name, message] of Object.entries(config.initialError)) {
      var [path, ...restPaths] = getPaths(name);
      if (typeof path !== 'undefined' && restPaths.length === 0) {
        result[path] = message;
      }
    }
    return result;
  });
  useEffect(() => {
    var handleInvalid = event => {
      var _config$name;
      var form = getFormElement(ref.current);
      var element = event.target;
      var prefix = (_config$name = config.name) !== null && _config$name !== void 0 ? _config$name : '';
      if (!isFieldElement(element) || element.form !== form || !element.name.startsWith(prefix) || !element.dataset.conformTouched) {
        return;
      }
      var name = element.name.slice(prefix.length);
      var [path, ...restPaths] = getPaths(name);
      if (typeof path === 'undefined' || restPaths.length > 0) {
        return;
      }
      setError(prev => {
        if (element.validationMessage === getValidationMessage(prev[path])) {
          return prev;
        }
        return _objectSpread2(_objectSpread2({}, prev), {}, {
          [path]: getErrors(element.validationMessage)
        });
      });
      event.preventDefault();
    };
    var handleReset = event => {
      var form = getFormElement(ref.current);
      if (form && event.target === form) {
        setError({});
      }
    };
    document.addEventListener('reset', handleReset);
    document.addEventListener('invalid', handleInvalid, true);
    return () => {
      document.removeEventListener('reset', handleReset);
      document.removeEventListener('invalid', handleInvalid, true);
    };
  }, [ref, config.name]);
  return [error, setError];
}

/**
 * Returns properties required to hook into form events.
 * Applied custom validation and define when error should be reported.
 *
 * @see https://conform.guide/api/react#useform
 */
function useForm() {
  var _config$lastSubmissio3, _config$lastSubmissio4;
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var configRef = useConfigRef(config);
  var ref = useFormRef(config.ref);
  var noValidate = useNoValidate(config.noValidate, config.fallbackNative);
  var report = useFormReporter(ref, config.lastSubmission);
  var [errors, setErrors] = useState(() => {
    var _config$lastSubmissio, _config$lastSubmissio2;
    return (_config$lastSubmissio = (_config$lastSubmissio2 = config.lastSubmission) === null || _config$lastSubmissio2 === void 0 ? void 0 : _config$lastSubmissio2.error['']) !== null && _config$lastSubmissio !== void 0 ? _config$lastSubmissio : [];
  });
  var initialError = useMemo(() => {
    var _submission$error$sco;
    var submission = config.lastSubmission;
    if (!submission) {
      return {};
    }
    var intent = parseIntent(submission.intent);
    var scope = getScope(intent);
    if (typeof scope !== 'string') {
      return submission.error;
    }
    return {
      [scope]: (_submission$error$sco = submission.error[scope]) !== null && _submission$error$sco !== void 0 ? _submission$error$sco : []
    };
  }, [config.lastSubmission]);
  // This payload from lastSubmission is only useful before hydration
  // After hydration, any new payload on lastSubmission will be ignored
  var [defaultValueFromLastSubmission, setDefaultValueFromLastSubmission] = useState( // @ts-expect-error defaultValue is not in Submission type
  (_config$lastSubmissio3 = (_config$lastSubmissio4 = config.lastSubmission) === null || _config$lastSubmissio4 === void 0 ? void 0 : _config$lastSubmissio4.payload) !== null && _config$lastSubmissio3 !== void 0 ? _config$lastSubmissio3 : null);
  var fieldset = useFieldset(ref, {
    defaultValue: defaultValueFromLastSubmission !== null && defaultValueFromLastSubmission !== void 0 ? defaultValueFromLastSubmission : config.defaultValue,
    initialError,
    constraint: config.constraint,
    form: config.id
  });
  useEffect(() => {
    // custom validate handler
    var createValidateHandler = type => event => {
      var field = event.target;
      var form = ref.current;
      var {
        shouldValidate = 'onSubmit',
        shouldRevalidate = shouldValidate
      } = configRef.current;
      if (!form || !isFocusableFormControl(field) || field.form !== form || !field.name) {
        return;
      }
      if (field.dataset.conformTouched ? shouldRevalidate === type : shouldValidate === type) {
        requestIntent(form, validate(field.name));
      }
    };
    var handleInvalid = event => {
      var form = ref.current;
      var field = event.target;
      if (!form || !isFieldElement(field) || field.form !== form || field.name !== FORM_ERROR_ELEMENT_NAME) {
        return;
      }
      event.preventDefault();
      if (field.dataset.conformTouched) {
        setErrors(getErrors(field.validationMessage));
      }
    };
    var handleReset = event => {
      var form = ref.current;
      if (!form || event.target !== form) {
        return;
      }

      // Reset all field state
      for (var _element of getFormControls(form)) {
        delete _element.dataset.conformTouched;
        _element.setCustomValidity('');
      }
      setErrors([]);
      setDefaultValueFromLastSubmission(null);
    };
    var handleInput = createValidateHandler('onInput');
    var handleBlur = createValidateHandler('onBlur');
    document.addEventListener('input', handleInput, true);
    document.addEventListener('blur', handleBlur, true);
    document.addEventListener('invalid', handleInvalid, true);
    document.addEventListener('reset', handleReset);
    return () => {
      document.removeEventListener('input', handleInput, true);
      document.removeEventListener('blur', handleBlur, true);
      document.removeEventListener('invalid', handleInvalid, true);
      document.removeEventListener('reset', handleReset);
    };
  }, [ref, configRef]);
  var form = {
    ref,
    error: errors[0],
    errors,
    props: {
      ref,
      noValidate,
      onSubmit(event) {
        var form = event.currentTarget;
        var nativeEvent = event.nativeEvent;
        var submitter = nativeEvent.submitter;
        if (event.defaultPrevented) {
          return;
        }
        try {
          var _config$onValidate, _config$onValidate2;
          var formData = getFormData(form, submitter);
          var submission = (_config$onValidate = (_config$onValidate2 = config.onValidate) === null || _config$onValidate2 === void 0 ? void 0 : _config$onValidate2.call(config, {
            form,
            formData
          })) !== null && _config$onValidate !== void 0 ? _config$onValidate : parse(formData);
          var {
            errors: _errors,
            shouldServerValidate
          } = Object.entries(submission.error).reduce((result, _ref) => {
            var [, error] = _ref;
            for (var message of error) {
              if (message === VALIDATION_UNDEFINED) {
                result.shouldServerValidate = true;
              } else if (message !== VALIDATION_SKIPPED) {
                result.errors.push(message);
              }
            }
            return result;
          }, {
            errors: [],
            shouldServerValidate: false
          });
          if (
          // has client validation
          typeof config.onValidate !== 'undefined' &&
          // not necessary to validate on the server
          !shouldServerValidate && (
          // client validation failed or non submit intent
          !config.noValidate && !(submitter !== null && submitter !== void 0 && submitter.formNoValidate) && _errors.length > 0 || parseIntent(submission.intent) !== null)) {
            report(form, submission);
            event.preventDefault();
          } else {
            var _config$onSubmit;
            (_config$onSubmit = config.onSubmit) === null || _config$onSubmit === void 0 ? void 0 : _config$onSubmit.call(config, event, {
              formData,
              submission,
              action: getFormAction(nativeEvent),
              encType: getFormEncType(nativeEvent),
              method: getFormMethod(nativeEvent)
            });
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn('Client validation failed', error);
        }
      }
    }
  };
  if (config.id) {
    form.id = config.id;
    form.errorId = "".concat(config.id, "-error");
    form.props.id = form.id;
  }
  if (form.errorId && form.errors.length > 0) {
    form.props['aria-invalid'] = 'true';
    form.props['aria-describedby'] = form.errorId;
  }
  return [form, fieldset];
}

/**
 * A set of field configuration
 */

/**
 * Returns all the information about the fieldset.
 *
 * @see https://conform.guide/api/react#usefieldset
 */

function useFieldset(ref, config) {
  var [error] = useFormError(ref, {
    initialError: config.initialError,
    name: config.name
  });

  /**
   * This allows us constructing the field at runtime as we have no information
   * about which fields would be available. The proxy will also help tracking
   * the usage of each field for optimization in the future.
   */
  return new Proxy({}, {
    get(_target, key) {
      var _fieldsetConfig$const, _fieldsetConfig$initi, _fieldsetConfig$defau;
      if (typeof key !== 'string') {
        return;
      }
      var fieldsetConfig = config;
      var constraint = (_fieldsetConfig$const = fieldsetConfig.constraint) === null || _fieldsetConfig$const === void 0 ? void 0 : _fieldsetConfig$const[key];
      var errors = error === null || error === void 0 ? void 0 : error[key];
      var initialError = Object.entries((_fieldsetConfig$initi = fieldsetConfig.initialError) !== null && _fieldsetConfig$initi !== void 0 ? _fieldsetConfig$initi : {}).reduce((result, _ref2) => {
        var [name, message] = _ref2;
        var [field, ...paths] = getPaths(name);
        if (field === key) {
          result[getName(paths)] = message;
        }
        return result;
      }, {});
      var field = _objectSpread2(_objectSpread2({}, constraint), {}, {
        name: fieldsetConfig.name ? "".concat(fieldsetConfig.name, ".").concat(key) : key,
        // @ts-expect-error The FieldValue type might need a rework
        defaultValue: (_fieldsetConfig$defau = fieldsetConfig.defaultValue) === null || _fieldsetConfig$defau === void 0 ? void 0 : _fieldsetConfig$defau[key],
        initialError,
        error: errors === null || errors === void 0 ? void 0 : errors[0],
        errors
      });
      if (fieldsetConfig.form) {
        field.form = fieldsetConfig.form;
        field.id = "".concat(fieldsetConfig.form, "-").concat(field.name);
        field.errorId = "".concat(field.id, "-error");
        field.descriptionId = "".concat(field.id, "-description");
      }
      return field;
    }
  });
}

/**
 * Returns a list of key and field config.
 *
 * @see https://conform.guide/api/react#usefieldlist
 */
function useFieldList(ref, config) {
  var configRef = useConfigRef(config);
  var [error, setError] = useFormError(ref, {
    initialError: config.initialError,
    name: config.name
  });
  var [entries, setEntries] = useState(() => {
    var _config$defaultValue;
    return Object.entries((_config$defaultValue = config.defaultValue) !== null && _config$defaultValue !== void 0 ? _config$defaultValue : []);
  });
  useEffect(() => {
    var conformHandler = event => {
      var form = getFormElement(ref.current);
      if (!form || event.target !== form) {
        return;
      }
      var intent = parseIntent(event.detail);
      if ((intent === null || intent === void 0 ? void 0 : intent.type) !== 'list' || (intent === null || intent === void 0 ? void 0 : intent.payload.name) !== configRef.current.name) {
        return;
      }
      setEntries(entries => {
        var list = [...entries];
        switch (intent.payload.operation) {
          case 'append':
          case 'prepend':
          case 'insert':
          case 'replace':
            return updateList(list, _objectSpread2(_objectSpread2({}, intent.payload), {}, {
              defaultValue: [
              // Generate a random key to avoid conflicts
              getUniqueKey(), intent.payload.defaultValue]
            }));
          default:
            return updateList(list, intent.payload);
        }
      });
      setError(error => {
        var errorList = [];
        for (var [key, messages] of Object.entries(error)) {
          if (typeof key === 'number') {
            errorList[key] = messages;
          }
        }
        switch (intent.payload.operation) {
          case 'append':
          case 'prepend':
          case 'insert':
          case 'replace':
            errorList = updateList(errorList, _objectSpread2(_objectSpread2({}, intent.payload), {}, {
              defaultValue: undefined
            }));
            break;
          default:
            errorList = updateList(errorList, intent.payload);
            break;
        }
        return Object.assign({}, errorList);
      });
    };
    var resetHandler = event => {
      var _configRef$current$de;
      var form = getFormElement(ref.current);
      if (!form || event.target !== form) {
        return;
      }
      setEntries(Object.entries((_configRef$current$de = configRef.current.defaultValue) !== null && _configRef$current$de !== void 0 ? _configRef$current$de : []));
    };

    // @ts-expect-error Custom event: conform
    document.addEventListener('conform', conformHandler, true);
    document.addEventListener('reset', resetHandler);
    return () => {
      // @ts-expect-error Custom event: conform
      document.removeEventListener('conform', conformHandler, true);
      document.removeEventListener('reset', resetHandler);
    };
  }, [ref, configRef, setError]);
  return entries.map((_ref3, index) => {
    var _config$initialError;
    var [key, defaultValue] = _ref3;
    var errors = error[index];
    var initialError = Object.entries((_config$initialError = config.initialError) !== null && _config$initialError !== void 0 ? _config$initialError : {}).reduce((result, _ref4) => {
      var [name, message] = _ref4;
      var [field, ...paths] = getPaths(name);
      if (field === index) {
        result[getName(paths)] = message;
      }
      return result;
    }, {});
    var fieldConfig = {
      name: "".concat(config.name, "[").concat(index, "]"),
      defaultValue,
      initialError,
      error: errors === null || errors === void 0 ? void 0 : errors[0],
      errors
    };
    if (config.form) {
      fieldConfig.form = config.form;
      fieldConfig.id = "".concat(config.form, "-").concat(config.name, "-").concat(index);
      fieldConfig.errorId = "".concat(fieldConfig.id, "-error");
      fieldConfig.descriptionId = "".concat(fieldConfig.id, "-description");
    }
    return _objectSpread2({
      key
    }, fieldConfig);
  });
}

/**
 * useLayoutEffect is client-only.
 * This basically makes it a no-op on server
 */
var useSafeLayoutEffect = typeof document === 'undefined' ? useEffect : useLayoutEffect;
/**
 * Returns a ref object and a set of helpers that dispatch corresponding dom event.
 *
 * @see https://conform.guide/api/react#useinputevent
 */
function useInputEvent(options) {
  var optionsRef = useConfigRef(options);
  var eventDispatched = useRef({
    onInput: false,
    onFocus: false,
    onBlur: false
  });
  useSafeLayoutEffect(() => {
    var createEventListener = listener => {
      return event => {
        var _optionsRef$current, _optionsRef$current2, _optionsRef$current3;
        var element = typeof ((_optionsRef$current = optionsRef.current) === null || _optionsRef$current === void 0 ? void 0 : _optionsRef$current.ref) === 'function' ? (_optionsRef$current2 = optionsRef.current) === null || _optionsRef$current2 === void 0 ? void 0 : _optionsRef$current2.ref() : (_optionsRef$current3 = optionsRef.current) === null || _optionsRef$current3 === void 0 ? void 0 : _optionsRef$current3.ref.current;
        if (isFieldElement(element) && (listener === 'onReset' ? event.target === element.form : event.target === element)) {
          var _optionsRef$current4, _optionsRef$current4$;
          if (listener !== 'onReset') {
            eventDispatched.current[listener] = true;
          }
          (_optionsRef$current4 = optionsRef.current) === null || _optionsRef$current4 === void 0 || (_optionsRef$current4$ = _optionsRef$current4[listener]) === null || _optionsRef$current4$ === void 0 ? void 0 : _optionsRef$current4$.call(_optionsRef$current4, event);
        }
      };
    };
    var inputHandler = createEventListener('onInput');
    var focusHandler = createEventListener('onFocus');
    var blurHandler = createEventListener('onBlur');
    var resetHandler = createEventListener('onReset');

    // focus/blur event does not bubble
    document.addEventListener('input', inputHandler, true);
    document.addEventListener('focus', focusHandler, true);
    document.addEventListener('blur', blurHandler, true);
    document.addEventListener('reset', resetHandler);
    return () => {
      document.removeEventListener('input', inputHandler, true);
      document.removeEventListener('focus', focusHandler, true);
      document.removeEventListener('blur', blurHandler, true);
      document.removeEventListener('reset', resetHandler);
    };
  }, []);
  var control = useMemo(() => {
    var dispatch = (listener, fn) => {
      if (!eventDispatched.current[listener]) {
        var _optionsRef$current5, _optionsRef$current6, _optionsRef$current7;
        var _element2 = typeof ((_optionsRef$current5 = optionsRef.current) === null || _optionsRef$current5 === void 0 ? void 0 : _optionsRef$current5.ref) === 'function' ? (_optionsRef$current6 = optionsRef.current) === null || _optionsRef$current6 === void 0 ? void 0 : _optionsRef$current6.ref() : (_optionsRef$current7 = optionsRef.current) === null || _optionsRef$current7 === void 0 ? void 0 : _optionsRef$current7.ref.current;
        if (!isFieldElement(_element2)) {
          // eslint-disable-next-line no-console
          console.warn('Failed to dispatch event; is the input mounted?');
          return;
        }

        // To avoid recursion
        eventDispatched.current[listener] = true;
        fn(_element2);
      }
      eventDispatched.current[listener] = false;
    };
    return {
      change(eventOrValue) {
        dispatch('onInput', element => {
          if (element instanceof HTMLInputElement && (element.type === 'checkbox' || element.type === 'radio')) {
            if (typeof eventOrValue !== 'boolean') {
              throw new Error('You should pass a boolean when changing a checkbox or radio input');
            }
            element.checked = eventOrValue;
          } else {
            if (typeof eventOrValue === 'boolean') {
              throw new Error('You can pass a boolean only when changing a checkbox or radio input');
            }
            var _value = typeof eventOrValue === 'string' ? eventOrValue : eventOrValue.target.value;

            // No change event will triggered on React if `element.value` is updated
            // before dispatching the event
            if (element.value !== _value) {
              /**
               * Triggering react custom change event
               * Solution based on dom-testing-library
               * @see https://github.com/facebook/react/issues/10135#issuecomment-401496776
               * @see https://github.com/testing-library/dom-testing-library/blob/main/src/events.js#L104-L123
               */
              var {
                set: valueSetter
              } = Object.getOwnPropertyDescriptor(element, 'value') || {};
              var prototype = Object.getPrototypeOf(element);
              var {
                set: prototypeValueSetter
              } = Object.getOwnPropertyDescriptor(prototype, 'value') || {};
              if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
                prototypeValueSetter.call(element, _value);
              } else {
                if (valueSetter) {
                  valueSetter.call(element, _value);
                } else {
                  throw new Error('The given element does not have a value setter');
                }
              }
            }
          }

          // Dispatch input event with the updated input value
          element.dispatchEvent(new InputEvent('input', {
            bubbles: true
          }));
          // Dispatch change event (necessary for select to update the selected option)
          element.dispatchEvent(new Event('change', {
            bubbles: true
          }));
        });
      },
      focus() {
        dispatch('onFocus', element => {
          element.dispatchEvent(new FocusEvent('focusin', {
            bubbles: true
          }));
          element.dispatchEvent(new FocusEvent('focus'));
        });
      },
      blur() {
        dispatch('onBlur', element => {
          element.dispatchEvent(new FocusEvent('focusout', {
            bubbles: true
          }));
          element.dispatchEvent(new FocusEvent('blur'));
        });
      }
    };
  }, [optionsRef]);
  return control;
}
var FORM_ERROR_ELEMENT_NAME = '__form__';

/**
 * Validate the form with the Constraint Validation API
 * @see https://conform.guide/api/react#validateconstraint
 */
function validateConstraint(options) {
  var _options$formData, _options$formatMessag;
  var formData = (_options$formData = options === null || options === void 0 ? void 0 : options.formData) !== null && _options$formData !== void 0 ? _options$formData : new FormData(options.form);
  var getDefaultErrors = (validity, result) => {
    var errors = [];
    if (validity.valueMissing) errors.push('required');
    if (validity.typeMismatch || validity.badInput) errors.push('type');
    if (validity.tooShort) errors.push('minLength');
    if (validity.rangeUnderflow) errors.push('min');
    if (validity.stepMismatch) errors.push('step');
    if (validity.tooLong) errors.push('maxLength');
    if (validity.rangeOverflow) errors.push('max');
    if (validity.patternMismatch) errors.push('pattern');
    for (var [constraintName, valid] of Object.entries(result)) {
      if (!valid) {
        errors.push(constraintName);
      }
    }
    return errors;
  };
  var formatMessages = (_options$formatMessag = options === null || options === void 0 ? void 0 : options.formatMessages) !== null && _options$formatMessag !== void 0 ? _options$formatMessag : _ref5 => {
    var {
      defaultErrors
    } = _ref5;
    return defaultErrors;
  };
  return parse(formData, {
    resolve() {
      var error = {};
      var constraintPattern = /^constraint[A-Z][^A-Z]*$/;
      var _loop = function _loop(_element3) {
        if (isFieldElement(_element3)) {
          var name = _element3.name !== FORM_ERROR_ELEMENT_NAME ? _element3.name : '';
          var constraint = Object.entries(_element3.dataset).reduce((result, _ref6) => {
            var [name, attributeValue = ''] = _ref6;
            if (constraintPattern.test(name)) {
              var _options$constraint;
              var constraintName = name.slice(10).toLowerCase();
              var _validate = (_options$constraint = options.constraint) === null || _options$constraint === void 0 ? void 0 : _options$constraint[constraintName];
              if (typeof _validate === 'function') {
                result[constraintName] = _validate(_element3.value, {
                  formData,
                  attributeValue
                });
              } else {
                // eslint-disable-next-line no-console
                console.warn("Found an \"".concat(constraintName, "\" constraint with undefined definition; Please specify it on the validateConstraint API."));
              }
            }
            return result;
          }, {});
          var errors = formatMessages({
            name,
            validity: _element3.validity,
            constraint,
            defaultErrors: getDefaultErrors(_element3.validity, constraint)
          });
          if (errors.length > 0) {
            error[name] = errors;
          }
        }
      };
      for (var _element3 of options.form.elements) {
        _loop(_element3);
      }
      return {
        error
      };
    }
  });
}
function getUniqueKey() {
  var [value] = crypto.getRandomValues(new Uint32Array(1));
  if (!value) {
    throw new Error('Fail to generate an unique key');
  }
  return value.toString(36);
}
function reportSubmission(form, submission) {
  for (var [name, message] of Object.entries(submission.error)) {
    // There is no need to create a placeholder button if all we want is to reset the error
    if (message.length === 0) {
      continue;
    }

    // We can't use empty string as button name
    // As `form.element.namedItem('')` will always returns null
    var elementName = name ? name : FORM_ERROR_ELEMENT_NAME;
    var item = form.elements.namedItem(elementName);
    if (item === null) {
      // Create placeholder button to keep the error without contributing to the form data
      var button = document.createElement('button');
      button.name = elementName;
      button.hidden = true;
      button.dataset.conformTouched = 'true';
      form.appendChild(button);
    }
  }
  var intent = parseIntent(submission.intent);
  var scope = getScope(intent);
  for (var _element4 of getFormControls(form)) {
    var _submission$error$_el;
    var _elementName = _element4.name !== FORM_ERROR_ELEMENT_NAME ? _element4.name : '';
    var messages = (_submission$error$_el = submission.error[_elementName]) !== null && _submission$error$_el !== void 0 ? _submission$error$_el : [];
    if (scope === null || scope === _elementName) {
      _element4.dataset.conformTouched = 'true';
    }
    if (!messages.includes(VALIDATION_SKIPPED) && !messages.includes(VALIDATION_UNDEFINED)) {
      var invalidEvent = new Event('invalid', {
        cancelable: true
      });
      _element4.setCustomValidity(getValidationMessage(messages));
      _element4.dispatchEvent(invalidEvent);
    }
  }
  if (!intent) {
    focusFirstInvalidControl(form);
  }
}
function getScope(intent) {
  switch (intent === null || intent === void 0 ? void 0 : intent.type) {
    case 'validate':
      return intent.payload;
    case 'list':
      return intent.payload.name;
  }
  return null;
}

export { FORM_ERROR_ELEMENT_NAME, getScope, getUniqueKey, reportSubmission, useFieldList, useFieldset, useForm, useInputEvent, validateConstraint };
