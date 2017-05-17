'use strict';

/***
 * @ngdoc service
 * @name tiUtil
 * @module ngTagsInput
 *
 * @description
 * Helper methods used internally by the directive. Should not be called directly from user code.
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var TiUtil = function TiUtil($timeout, $q) {
    _classCallCheck(this, TiUtil);

    _initialiseProps.call(this);

    this.$timeout = $timeout;
    this.$q = $q;
};

var _initialiseProps = function _initialiseProps() {
    var _this = this,
        _arguments = arguments;

    this.debounce = function(fn, delay) {
        var $timeout = _this.$timeout;


        var timeoutId;
        return function() {
            _this.args = arguments;
            $timeout.cancel(timeoutId);
            timeoutId = $timeout(function() {
                fn.apply(null, _this.args);
            }, delay);
        };
    };

    this.makeObjectArray = function(array, key) {
        if (!_angular2.default.isArray(array) || array.length === 0 || _angular2.default.isObject(array[0])) {
            return array;
        }

        var newArray = [];
        array.forEach(function(item) {
            var obj = {};
            obj[key] = item;
            newArray.push(obj);
        });
        return newArray;
    };

    this.findInObjectArray = function(array, obj, key, comparer) {
        var item = null;
        comparer = comparer || _this.defaultComparer;

        array.some(function(element) {
            if (comparer(element[key], obj[key])) {
                item = element;
                return true;
            }
        });

        return item;
    };

    this.defaultComparer = function(a, b) {
        // I'm aware of the internationalization issues regarding toLowerCase()
        // but I couldn't come up with a better solution right now
        return _this.safeToString(a).toLowerCase() === _this.safeToString(b).toLowerCase();
    };

    this.safeHighlight = function(str, value) {
        str = encodeHTML(str);
        value = encodeHTML(value);

        if (!value) {
            return str;
        }

        var escapeRegexChars = function escapeRegexChars(str) {
            return str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
        };

        var expression = new RegExp('&[^;]+;|' + escapeRegexChars(value), 'gi');
        return str.replace(expression, function(match) {
            return match.toLowerCase() === value.toLowerCase() ? '<em>' + match + '</em>' : match;
        });
    };

    this.safeToString = function(value) {
        return _angular2.default.isUndefined(value) || value == null ? '' : value.toString().trim();
    };

    this.encodeHTML = function(value) {
        return _this.safeToString(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    };

    this.handleUndefinedResult = function(fn, valueIfUndefined) {
        return function() {
            var result = fn.apply(null, arguments);
            return _angular2.default.isUndefined(result) ? valueIfUndefined : result;
        };
    };

    this.replaceSpacesWithDashes = function(str) {
        return _this.safeToString(str).replace(/\s/g, '-');
    };

    this.isModifierOn = function(event) {
        return event.shiftKey || event.ctrlKey || event.altKey || event.metaKey;
    };

    this.promisifyValue = function(value) {
        var $q = _this.$q;


        value = _angular2.default.isUndefined(value) ? true : value;
        return $q[value ? 'when' : 'reject']();
    };

    this.simplePubSub = function() {
        var $ctrl = _this;

        var events = {};
        return {
            on: function on(names, handler, first) {
                names.split(' ').forEach(function(name) {
                    if (!events[name]) {
                        events[name] = [];
                    }
                    var method = first ? [].unshift : [].push;
                    method.call(events[name], handler);
                });
                return this;
            },
            trigger: function trigger(name, args) {
                var handlers = events[name] || [];
                handlers.every(function(handler) {
                    return $ctrl.handleUndefinedResult(handler, true)(args);
                });
                return this;
            }
        };
    };
};

exports.default = TiUtil;
