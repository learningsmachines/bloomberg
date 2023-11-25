'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_virtual/_rollupPluginBabelHelpers.js');
var zod = require('zod');

function getConstraint(schema) {
  function inferConstraint(schema) {
    var constraint = {};
    if (schema instanceof zod.ZodEffects) {
      constraint = _rollupPluginBabelHelpers.objectSpread2({}, inferConstraint(schema.innerType()));
    } else if (schema instanceof zod.ZodPipeline) {
      constraint = _rollupPluginBabelHelpers.objectSpread2({}, inferConstraint(schema._def.out));
    } else if (schema instanceof zod.ZodOptional) {
      constraint = _rollupPluginBabelHelpers.objectSpread2(_rollupPluginBabelHelpers.objectSpread2({}, inferConstraint(schema.unwrap())), {}, {
        required: false
      });
    } else if (schema instanceof zod.ZodDefault) {
      constraint = _rollupPluginBabelHelpers.objectSpread2(_rollupPluginBabelHelpers.objectSpread2({}, inferConstraint(schema.removeDefault())), {}, {
        required: false
      });
    } else if (schema instanceof zod.ZodArray) {
      constraint = _rollupPluginBabelHelpers.objectSpread2(_rollupPluginBabelHelpers.objectSpread2({}, inferConstraint(schema.element)), {}, {
        multiple: true
      });
    } else if (schema instanceof zod.ZodString) {
      for (var check of schema._def.checks) {
        switch (check.kind) {
          case 'min':
            if (!constraint.minLength || constraint.minLength < check.value) {
              constraint.minLength = check.value;
            }
            break;
          case 'max':
            if (!constraint.maxLength || constraint.maxLength > check.value) {
              constraint.maxLength = check.value;
            }
            break;
          case 'regex':
            if (!constraint.pattern) {
              constraint.pattern = check.regex.source;
            }
            break;
        }
      }
    } else if (schema instanceof zod.ZodNumber) {
      for (var _check of schema._def.checks) {
        switch (_check.kind) {
          case 'min':
            if (!constraint.min || constraint.min < _check.value) {
              constraint.min = _check.value;
            }
            break;
          case 'max':
            if (!constraint.max || constraint.max > _check.value) {
              constraint.max = _check.value;
            }
            break;
        }
      }
    } else if (schema instanceof zod.ZodEnum) {
      constraint.pattern = schema.options.map(option =>
      // To escape unsafe characters on regex
      option.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')).join('|');
    }
    if (typeof constraint.required === 'undefined') {
      constraint.required = true;
    }
    return constraint;
  }
  var keys = ['required', 'minLength', 'maxLength', 'min', 'max', 'step', 'multiple', 'pattern'];
  function resolveFieldsetConstraint(schema) {
    if (schema instanceof zod.ZodObject) {
      var result = {};
      for (var [key, def] of Object.entries(schema.shape)) {
        // @ts-expect-error
        result[key] = inferConstraint(def);
      }
      return result;
    }
    if (schema instanceof zod.ZodEffects) {
      return resolveFieldsetConstraint(schema.innerType());
    } else if (schema instanceof zod.ZodOptional) {
      return resolveFieldsetConstraint(schema.unwrap());
    } else if (schema instanceof zod.ZodIntersection) {
      return _rollupPluginBabelHelpers.objectSpread2(_rollupPluginBabelHelpers.objectSpread2({}, resolveFieldsetConstraint(schema._def.left)), resolveFieldsetConstraint(schema._def.right));
    } else if (schema instanceof zod.ZodUnion || schema instanceof zod.ZodDiscriminatedUnion) {
      var options = schema.options;
      return options.map(resolveFieldsetConstraint).reduce((prev, next) => {
        var list = new Set([...Object.keys(prev), ...Object.keys(next)]);
        var result = {};
        for (var name of list) {
          // @ts-expect-error
          var prevConstraint = prev[name];
          // @ts-expect-error
          var nextConstraint = next[name];
          if (prevConstraint && nextConstraint) {
            result[name] = {};
            for (var _key of keys) {
              if (typeof prevConstraint[_key] !== 'undefined' && typeof nextConstraint[_key] !== 'undefined' && prevConstraint[_key] === nextConstraint[_key]) {
                // @ts-expect-error
                result[name][_key] = prevConstraint[_key];
              }
            }
          } else {
            result[name] = _rollupPluginBabelHelpers.objectSpread2(_rollupPluginBabelHelpers.objectSpread2(_rollupPluginBabelHelpers.objectSpread2({}, prevConstraint), nextConstraint), {}, {
              required: false
            });
          }
        }
        return result;
      });
    }
    return {};
  }
  return resolveFieldsetConstraint(schema);
}

exports.getConstraint = getConstraint;
