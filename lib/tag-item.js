'use strict';

/**
 * @ngdoc directive
 * @name tiTagItem
 * @module ngTagsInput
 *
 * @description
 * Represents a tag item. Used internally by the tagsInput directive.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tagItem = require('./tag-item.html');

var _tagItem2 = _interopRequireDefault(_tagItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tiTagItem = function tiTagItem(tiUtil) {
  return {
    restrict: 'E',
    require: '^tagsInput',
    template: _tagItem2.default,
    // template: '<ng-include src="$$template"></ng-include>',
    scope: {
      $scope: '=scope',
      data: '='
    },
    link: function link(scope, element, attrs, tagsInputCtrl) {
      var tagsInput = tagsInputCtrl.registerTagItem(),
          options = tagsInput.getOptions();

      scope.$$template = options.template;
      scope.$$removeTagSymbol = options.removeTagSymbol;

      scope.$getDisplayText = function () {
        return tiUtil.safeToString(scope.data[options.displayProperty]);
      };
      scope.$removeTag = function () {
        tagsInput.removeTag(scope.$index);
      };

      scope.$watch('$parent.$index', function (value) {
        scope.$index = value;
      });
    }
  };
};exports.default = tiTagItem;