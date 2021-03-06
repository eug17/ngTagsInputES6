'use strict';

/**
 * @ngdoc directive
 * @name autoComplete
 * @module ngTagsInput
 *
 * @description
 * Provides autocomplete support for the tagsInput directive.
 *
 * @param {expression} source Expression to evaluate upon changing the input content. The input value is available as
 *    $query. The result of the expression must be a promise that eventually resolves to an array of strings.
 * @param {string=} [template=NA] URL or id of a custom template for rendering each element of the autocomplete list.
 * @param {string=} [displayProperty=tagsInput.displayText] Property to be rendered as the autocomplete label.
 * @param {number=} [debounceDelay=100] Amount of time, in milliseconds, to wait before evaluating the expression in
 *    the source option after the last keystroke.
 * @param {number=} [minLength=3] Minimum number of characters that must be entered before evaluating the expression
 *    in the source option.
 * @param {boolean=} [highlightMatchedText=true] Flag indicating that the matched text will be highlighted in the
 *    suggestions list.
 * @param {number=} [maxResultsToShow=10] Maximum number of results to be displayed at a time.
 * @param {boolean=} [loadOnDownArrow=false] Flag indicating that the source option will be evaluated when the down arrow
 *    key is pressed and the suggestion list is closed. The current input value is available as $query.
 * @param {boolean=} [loadOnEmpty=false] Flag indicating that the source option will be evaluated when the input content
 *    becomes empty. The $query variable will be passed to the expression as an empty string.
 * @param {boolean=} [loadOnFocus=false] Flag indicating that the source option will be evaluated when the input element
 *    gains focus. The current input value is available as $query.
 * @param {boolean=} [selectFirstMatch=true] Flag indicating that the first match will be automatically selected once
 *    the suggestion list is shown.
 * @param {expression=} [matchClass=NA] Expression to evaluate for each match in order to get the CSS classes to be used.
 *    The expression is provided with the current match as $match, its index as $index and its state as $selected. The result
 *    of the evaluation must be one of the values supported by the ngClass directive (either a string, an array or an object).
 *    See https://docs.angularjs.org/api/ng/directive/ngClass for more information.
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = require('./constants');

var _autoComplete = require('./auto-complete.html');

var _autoComplete2 = _interopRequireDefault(_autoComplete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var autoComplete = function autoComplete($document, $timeout, $sce, $q, tagsInputConfig, tiUtil) {
    return {
        restrict: 'E',
        require: '^tagsInput',
        scope: {
            source: '&',
            matchClass: '&'
        },
        template: _autoComplete2.default,
        controller: function controller($scope, $element, $attrs) {
            $scope.events = tiUtil.simplePubSub();

            tagsInputConfig.load('autoComplete', $scope, $attrs, {
                template: [String, 'ngTagsInput/auto-complete-match.html'],
                debounceDelay: [Number, 100],
                minLength: [Number, 3],
                highlightMatchedText: [Boolean, true],
                maxResultsToShow: [Number, 10],
                loadOnDownArrow: [Boolean, false],
                loadOnEmpty: [Boolean, false],
                loadOnFocus: [Boolean, false],
                selectFirstMatch: [Boolean, true],
                displayProperty: [String, '']
            });

            $scope.suggestionList = new SuggestionList($scope.source, $scope.options, $scope.events, tiUtil, $q);

            this.registerAutocompleteMatch = function () {
                return {
                    getOptions: function getOptions() {
                        return $scope.options;
                    },
                    getQuery: function getQuery() {
                        return $scope.suggestionList.query;
                    }
                };
            };
        },
        link: function link(scope, element, attrs, tagsInputCtrl) {
            var hotkeys = [_constants.KEYS.enter, _constants.KEYS.tab, _constants.KEYS.escape, _constants.KEYS.up, _constants.KEYS.down],
                suggestionList = scope.suggestionList,
                tagsInput = tagsInputCtrl.registerAutocomplete(),
                options = scope.options,
                events = scope.events,
                shouldLoadSuggestions;

            // console.log('link ac:', tagsInput, tagsInputCtrl);

            options.tagsInput = tagsInput.getOptions();

            shouldLoadSuggestions = function shouldLoadSuggestions(value) {
                return value && value.length >= options.minLength || !value && options.loadOnEmpty;
            };

            scope.templateScope = tagsInput.getTemplateScope();

            scope.addSuggestionByIndex = function (index) {
                suggestionList.select(index);
                scope.addSuggestion();
            };

            scope.addSuggestion = function () {
                var added = false;

                if (suggestionList.selected) {
                    tagsInput.addTag(angular.copy(suggestionList.selected));
                    suggestionList.reset();
                    added = true;
                }
                return added;
            };

            scope.track = function (item) {
                return item[options.tagsInput.keyProperty || options.tagsInput.displayProperty];
            };

            scope.getSuggestionClass = function (item, index) {
                var selected = item === suggestionList.selected;
                return [scope.matchClass({
                    $match: item,
                    $index: index,
                    $selected: selected
                }), {
                    selected: selected
                }];
            };

            tagsInput.on('tag-added tag-removed invalid-tag input-blur', function () {
                suggestionList.reset();
            });
            tagsInput.on('input-change', function (value) {
                if (shouldLoadSuggestions(value)) {
                    suggestionList.load(value, tagsInput.getTags());
                } else {
                    suggestionList.reset();
                }
            });
            tagsInput.on('input-focus', function () {
                var value = tagsInput.getCurrentTagText();
                if (options.loadOnFocus && shouldLoadSuggestions(value)) {
                    suggestionList.load(value, tagsInput.getTags());
                }
            });
            tagsInput.on('input-keydown', function (event) {
                // console.log('autocomplete input-keydown: ', event)
                var key = event.keyCode,
                    handled = false;

                if (tiUtil.isModifierOn(event) || hotkeys.indexOf(key) === -1) {
                    return;
                }

                if (suggestionList.visible) {

                    if (key === _constants.KEYS.down) {
                        suggestionList.selectNext();
                        handled = true;
                    } else if (key === _constants.KEYS.up) {
                        suggestionList.selectPrior();
                        handled = true;
                    } else if (key === _constants.KEYS.escape) {
                        suggestionList.reset();
                        handled = true;
                    } else if (key === _constants.KEYS.enter || key === _constants.KEYS.tab) {
                        handled = scope.addSuggestion();
                    }
                } else {
                    if (key === _constants.KEYS.down && scope.options.loadOnDownArrow) {
                        suggestionList.load(tagsInput.getCurrentTagText(), tagsInput.getTags());
                        handled = true;
                    }
                }

                if (handled) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    return false;
                }
            });

            events.on('suggestion-selected', function (index) {
                scrollToElement(element, index);
            });
        }
    };
};

function SuggestionList(loadFn, options, events, tiUtil, $q) {
    var self = {},
        getDifference,
        lastPromise,
        getTagId;

    getTagId = function getTagId() {
        return options.tagsInput.keyProperty || options.tagsInput.displayProperty;
    };

    getDifference = function getDifference(array1, array2) {
        return array1.filter(function (item) {
            return !tiUtil.findInObjectArray(array2, item, getTagId(), function (a, b) {
                if (options.tagsInput.replaceSpacesWithDashes) {
                    a = tiUtil.replaceSpacesWithDashes(a);
                    b = tiUtil.replaceSpacesWithDashes(b);
                }
                return tiUtil.defaultComparer(a, b);
            });
        });
    };

    self.reset = function () {
        lastPromise = null;

        self.items = [];
        self.visible = false;
        self.index = -1;
        self.selected = null;
        self.query = null;
    };

    self.show = function () {
        if (options.selectFirstMatch) {
            self.select(0);
        } else {
            self.selected = null;
        }
        self.visible = true;
    };
    self.load = tiUtil.debounce(function (query, tags) {
        self.query = query;

        var promise = $q.when(loadFn({
            $query: query
        }));
        lastPromise = promise;

        promise.then(function (items) {
            if (promise !== lastPromise) {
                return;
            }

            items = tiUtil.makeObjectArray(items.data || items, getTagId());
            items = getDifference(items, tags);
            self.items = items.slice(0, options.maxResultsToShow);

            if (self.items.length > 0) {
                self.show();
            } else {
                self.reset();
            }
        });
    }, options.debounceDelay);

    self.selectNext = function () {
        self.select(++self.index);
    };
    self.selectPrior = function () {
        self.select(--self.index);
    };
    self.select = function (index) {
        if (index < 0) {
            index = self.items.length - 1;
        } else if (index >= self.items.length) {
            index = 0;
        }
        self.index = index;
        self.selected = self.items[index];
        events.trigger('suggestion-selected', index);
    };

    self.reset();

    return self;
}

function scrollToElement(root, index) {
    var element = root.find('li').eq(index),
        parent = element.parent(),
        elementTop = element.prop('offsetTop'),
        elementHeight = element.prop('offsetHeight'),
        parentHeight = parent.prop('clientHeight'),
        parentScrollTop = parent.prop('scrollTop');

    if (elementTop < parentScrollTop) {
        parent.prop('scrollTop', elementTop);
    } else if (elementTop + elementHeight > parentHeight + parentScrollTop) {
        parent.prop('scrollTop', elementTop + elementHeight - parentHeight);
    }
}

exports.default = autoComplete;