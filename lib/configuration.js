'use strict';

/**
 * @ngdoc service
 * @name tagsInputConfig
 * @module ngTagsInput
 *
 * @description
 * Sets global configuration settings for both tagsInput and autoComplete directives. It's also used internally to parse and
 *  initialize options from HTML attributes.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TagsInputConfig = function TagsInputConfig() {
  var _this = this;

  _classCallCheck(this, TagsInputConfig);

  this.setDefaults = function (directive, defaults) {
    _this.globalDefaults[directive] = defaults;
    return _this;
  };

  this.setActiveInterpolation = function (directive, options) {
    _this.interpolationStatus[directive] = options;
    return _this;
  };

  this.setTextAutosizeThreshold = function (threshold) {
    _this.autosizeThreshold = threshold;
    return _this;
  };

  this.$get = function ($interpolate) {
    var $ctrl = _this;

    var converters = {};
    converters[String] = function (value) {
      return value;
    };
    converters[Number] = function (value) {
      return parseInt(value, 10);
    };
    converters[Boolean] = function (value) {
      return value.toLowerCase() === 'true';
    };
    converters[RegExp] = function (value) {
      return new RegExp(value);
    };

    return {
      load: function load(directive, scope, attrs, options) {
        var defaultValidator = function defaultValidator() {
          return true;
        };

        scope.options = {};

        _angular2.default.forEach(options, function (value, key) {
          var type, localDefault, validator, converter, getDefault, updateValue;

          type = value[0];
          localDefault = value[1];
          validator = value[2] || defaultValidator;
          converter = converters[type];

          getDefault = function getDefault() {
            var globalValue = $ctrl.globalDefaults[directive] && $ctrl.globalDefaults[directive][key];
            return _angular2.default.isDefined(globalValue) ? globalValue : localDefault;
          };

          updateValue = function updateValue(value) {
            scope.options[key] = value && validator(value) ? converter(value) : getDefault();
          };

          if ($ctrl.interpolationStatus[directive] && $ctrl.interpolationStatus[directive][key]) {
            attrs.$observe(key, function (value) {
              updateValue(value);
              scope.events.trigger('option-change', { name: key, newValue: value });
            });
          } else {
            updateValue(attrs[key] && $interpolate(attrs[key])(scope.$parent));
          }
        });
      },
      getTextAutosizeThreshold: function getTextAutosizeThreshold() {
        return $ctrl.autosizeThreshold;
      }
    };
  };

  this.globalDefaults = {};
  this.interpolationStatus = {};
  this.autosizeThreshold = 3;
}

/**
 * @ngdoc method
 * @name tagsInputConfig#setActiveInterpolation
 * @description Sets active interpolation for a set of options.
 *
 * @param {string} directive Name of the directive to be configured. Must be either 'tagsInput' or 'autoComplete'.
 * @param {object} options Object containing which options should have interpolation turned on at all times.
 *
 * @returns {object} The service itself for chaining purposes.
 */


/**
 * @ngdoc method
 * @name tagsInputConfig#setTextAutosizeThreshold
 * @description Sets the threshold used by the tagsInput directive to re-size the inner input field element based on its contents.
 *
 * @param {number} threshold Threshold value, in pixels.
 *
 * @returns {object} The service itself for chaining purposes.
 */
;

exports.default = TagsInputConfig;

// const tagsInputConfig = () => {
//   var globalDefaults = {},
//     interpolationStatus = {},
//     autosizeThreshold = 3;
//
//   /**
//    * @ngdoc method
//    * @name tagsInputConfig#setDefaults
//    * @description Sets the default configuration option for a directive.
//    *
//    * @param {string} directive Name of the directive to be configured. Must be either 'tagsInput' or 'autoComplete'.
//    * @param {object} defaults Object containing options and their values.
//    *
//    * @returns {object} The service itself for chaining purposes.
//    */
//   this.setDefaults = function(directive, defaults) {
//     globalDefaults[directive] = defaults;
//     return this;
//   };
//
//   /**
//    * @ngdoc method
//    * @name tagsInputConfig#setActiveInterpolation
//    * @description Sets active interpolation for a set of options.
//    *
//    * @param {string} directive Name of the directive to be configured. Must be either 'tagsInput' or 'autoComplete'.
//    * @param {object} options Object containing which options should have interpolation turned on at all times.
//    *
//    * @returns {object} The service itself for chaining purposes.
//    */
//   this.setActiveInterpolation = function(directive, options) {
//     interpolationStatus[directive] = options;
//     return this;
//   };
//
//   /**
//    * @ngdoc method
//    * @name tagsInputConfig#setTextAutosizeThreshold
//    * @description Sets the threshold used by the tagsInput directive to re-size the inner input field element based on its contents.
//    *
//    * @param {number} threshold Threshold value, in pixels.
//    *
//    * @returns {object} The service itself for chaining purposes.
//    */
//   this.setTextAutosizeThreshold = function(threshold) {
//     autosizeThreshold = threshold;
//     return this;
//   };
//
//   this.$get = function($interpolate) {
//     var converters = {};
//     converters[String] = function(value) { return value; };
//     converters[Number] = function(value) { return parseInt(value, 10); };
//     converters[Boolean] = function(value) { return value.toLowerCase() === 'true'; };
//     converters[RegExp] = function(value) { return new RegExp(value); };
//
//     return {
//       load: function(directive, scope, attrs, options) {
//         var defaultValidator = function() { return true; };
//
//         scope.options = {};
//
//         angular.forEach(options, function(value, key) {
//           var type, localDefault, validator, converter, getDefault, updateValue;
//
//           type = value[0];
//           localDefault = value[1];
//           validator = value[2] || defaultValidator;
//           converter = converters[type];
//
//           getDefault = function() {
//             var globalValue = globalDefaults[directive] && globalDefaults[directive][key];
//             return angular.isDefined(globalValue) ? globalValue : localDefault;
//           };
//
//           updateValue = function(value) {
//             scope.options[key] = value && validator(value) ? converter(value) : getDefault();
//           };
//
//           if (interpolationStatus[directive] && interpolationStatus[directive][key]) {
//             attrs.$observe(key, function(value) {
//               updateValue(value);
//               scope.events.trigger('option-change', { name: key, newValue: value });
//             });
//           }
//           else {
//             updateValue(attrs[key] && $interpolate(attrs[key])(scope.$parent));
//           }
//         });
//       },
//       getTextAutosizeThreshold: function() {
//         return autosizeThreshold;
//       }
//     };
//   };
// };
//
// export default tagsInputConfig;

// tagsInput.provider('tagsInputConfig', function() {
//     var globalDefaults = {},
//         interpolationStatus = {},
//         autosizeThreshold = 3;
//
//     /**
//      * @ngdoc method
//      * @name tagsInputConfig#setDefaults
//      * @description Sets the default configuration option for a directive.
//      *
//      * @param {string} directive Name of the directive to be configured. Must be either 'tagsInput' or 'autoComplete'.
//      * @param {object} defaults Object containing options and their values.
//      *
//      * @returns {object} The service itself for chaining purposes.
//      */
//     this.setDefaults = function(directive, defaults) {
//         globalDefaults[directive] = defaults;
//         return this;
//     };
//
//     /**
//      * @ngdoc method
//      * @name tagsInputConfig#setActiveInterpolation
//      * @description Sets active interpolation for a set of options.
//      *
//      * @param {string} directive Name of the directive to be configured. Must be either 'tagsInput' or 'autoComplete'.
//      * @param {object} options Object containing which options should have interpolation turned on at all times.
//      *
//      * @returns {object} The service itself for chaining purposes.
//      */
//     this.setActiveInterpolation = function(directive, options) {
//         interpolationStatus[directive] = options;
//         return this;
//     };
//
//     /**
//      * @ngdoc method
//      * @name tagsInputConfig#setTextAutosizeThreshold
//      * @description Sets the threshold used by the tagsInput directive to re-size the inner input field element based on its contents.
//      *
//      * @param {number} threshold Threshold value, in pixels.
//      *
//      * @returns {object} The service itself for chaining purposes.
//      */
//     this.setTextAutosizeThreshold = function(threshold) {
//         autosizeThreshold = threshold;
//         return this;
//     };
//
//     this.$get = function($interpolate) {
//         var converters = {};
//         converters[String] = function(value) { return value; };
//         converters[Number] = function(value) { return parseInt(value, 10); };
//         converters[Boolean] = function(value) { return value.toLowerCase() === 'true'; };
//         converters[RegExp] = function(value) { return new RegExp(value); };
//
//         return {
//             load: function(directive, scope, attrs, options) {
//                 var defaultValidator = function() { return true; };
//
//                 scope.options = {};
//
//                 angular.forEach(options, function(value, key) {
//                     var type, localDefault, validator, converter, getDefault, updateValue;
//
//                     type = value[0];
//                     localDefault = value[1];
//                     validator = value[2] || defaultValidator;
//                     converter = converters[type];
//
//                     getDefault = function() {
//                         var globalValue = globalDefaults[directive] && globalDefaults[directive][key];
//                         return angular.isDefined(globalValue) ? globalValue : localDefault;
//                     };
//
//                     updateValue = function(value) {
//                         scope.options[key] = value && validator(value) ? converter(value) : getDefault();
//                     };
//
//                     if (interpolationStatus[directive] && interpolationStatus[directive][key]) {
//                         attrs.$observe(key, function(value) {
//                             updateValue(value);
//                             scope.events.trigger('option-change', { name: key, newValue: value });
//                         });
//                     }
//                     else {
//                         updateValue(attrs[key] && $interpolate(attrs[key])(scope.$parent));
//                     }
//                 });
//             },
//             getTextAutosizeThreshold: function() {
//                 return autosizeThreshold;
//             }
//         };
//     };
// });