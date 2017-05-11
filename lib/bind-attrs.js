'use strict';

/**
 * @ngdoc directive
 * @name tiBindAttrs
 * @module ngTagsInput
 *
 * @description
 * Binds attributes to expressions. Used internally by tagsInput directive.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tiBindAttrs = function tiBindAttrs() {
  return {
    link: function link(scope, element, attrs) {
      scope.$watch(attrs.tiBindAttrs, function (value) {
        _angular2.default.forEach(value, function (value, key) {
          attrs.$set(key, value);
        });
      }, true);
    }
  };
};exports.default = tiBindAttrs;