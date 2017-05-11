'use strict';

/**
 * @ngdoc directive
 * @name tagsInput
 * @module ngTagsInput
 *
 * @description
 * Renders an input box with tag editing support.
 *
 * @param {string} ngModel Assignable Angular expression to data-bind to.
 * @param {string=} [template=NA] URL or id of a custom template for rendering each tag.
 * @param {string=} [templateScope=NA] Scope to be passed to custom templates - of both tagsInput and
 *    autoComplete directives - as $scope.
 * @param {string=} [displayProperty=text] Property to be rendered as the tag label.
 * @param {string=} [keyProperty=text] Property to be used as a unique identifier for the tag.
 * @param {string=} [type=text] Type of the input element. Only 'text', 'email' and 'url' are supported values.
 * @param {string=} [text=NA] Assignable Angular expression for data-binding to the element's text.
 * @param {number=} tabindex Tab order of the control.
 * @param {string=} [placeholder=Add a tag] Placeholder text for the control.
 * @param {number=} [minLength=3] Minimum length for a new tag.
 * @param {number=} [maxLength=MAX_SAFE_INTEGER] Maximum length allowed for a new tag.
 * @param {number=} [minTags=0] Sets minTags validation error key if the number of tags added is less than minTags.
 * @param {number=} [maxTags=MAX_SAFE_INTEGER] Sets maxTags validation error key if the number of tags added is greater
 *    than maxTags.
 * @param {boolean=} [allowLeftoverText=false] Sets leftoverText validation error key if there is any leftover text in
 *    the input element when the directive loses focus.
 * @param {string=} [removeTagSymbol=×] (Obsolete) Symbol character for the remove tag button.
 * @param {boolean=} [addOnEnter=true] Flag indicating that a new tag will be added on pressing the ENTER key.
 * @param {boolean=} [addOnSpace=false] Flag indicating that a new tag will be added on pressing the SPACE key.
 * @param {boolean=} [addOnComma=true] Flag indicating that a new tag will be added on pressing the COMMA key.
 * @param {boolean=} [addOnBlur=true] Flag indicating that a new tag will be added when the input field loses focus.
 * @param {boolean=} [addOnPaste=false] Flag indicating that the text pasted into the input field will be split into tags.
 * @param {string=} [pasteSplitPattern=,] Regular expression used to split the pasted text into tags.
 * @param {boolean=} [replaceSpacesWithDashes=true] Flag indicating that spaces will be replaced with dashes.
 * @param {string=} [allowedTagsPattern=.+] Regular expression that determines whether a new tag is valid.
 * @param {boolean=} [enableEditingLastTag=false] Flag indicating that the last tag will be moved back into the new tag
 *    input box instead of being removed when the backspace key is pressed and the input box is empty.
 * @param {boolean=} [addFromAutocompleteOnly=false] Flag indicating that only tags coming from the autocomplete list
 *    will be allowed. When this flag is true, addOnEnter, addOnComma, addOnSpace and addOnBlur values are ignored.
 * @param {boolean=} [spellcheck=true] Flag indicating whether the browser's spellcheck is enabled for the input field or not.
 * @param {expression=} [tagClass=NA] Expression to evaluate for each existing tag in order to get the CSS classes to be used.
 *    The expression is provided with the current tag as $tag, its index as $index and its state as $selected. The result
 *    of the evaluation must be one of the values supported by the ngClass directive (either a string, an array or an object).
 *    See https://docs.angularjs.org/api/ng/directive/ngClass for more information.
 * @param {expression=} [onTagAdding=NA] Expression to evaluate that will be invoked before adding a new tag. The new
 *    tag is available as $tag. This method must return either a boolean value or a promise. If either a false value or a rejected
 *    promise is returned, the tag will not be added.
 * @param {expression=} [onTagAdded=NA] Expression to evaluate upon adding a new tag. The new tag is available as $tag.
 * @param {expression=} [onInvalidTag=NA] Expression to evaluate when a tag is invalid. The invalid tag is available as $tag.
 * @param {expression=} [onTagRemoving=NA] Expression to evaluate that will be invoked before removing a tag. The tag
 *    is available as $tag. This method must return either a boolean value or a promise. If either a false value or a rejected
 *    promise is returned, the tag will not be removed.
 * @param {expression=} [onTagRemoved=NA] Expression to evaluate upon removing an existing tag. The removed tag is available as $tag.
 * @param {expression=} [onTagClicked=NA] Expression to evaluate upon clicking an existing tag. The clicked tag is available as $tag.
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _constants = require('./constants');

var _tagsInput = require('./tags-input.html');

var _tagsInput2 = _interopRequireDefault(_tagsInput);

var _tagItem = require('./tag-item.html');

var _tagItem2 = _interopRequireDefault(_tagItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tagsInput = function tagsInput($timeout, $document, $window, $q, tagsInputConfig, tiUtil) {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            tags: '=ngModel',
            text: '=?',
            templateScope: '=?',
            tagClass: '&',
            onTagAdding: '&',
            onTagAdded: '&',
            onInvalidTag: '&',
            onTagRemoving: '&',
            onTagRemoved: '&',
            onTagClicked: '&'
        },
        replace: false,
        transclude: true,
        template: _tagsInput2.default,
        controller: function controller($scope, $attrs, $element) {
            var _this = this;

            $scope.events = tiUtil.simplePubSub();

            tagsInputConfig.load('tagsInput', $scope, $attrs, {
                template: [String, _tagItem2.default],
                type: [String, 'text', validateType],
                placeholder: [String, 'Add a tag'],
                tabindex: [Number, null],
                removeTagSymbol: [String, String.fromCharCode(215)],
                replaceSpacesWithDashes: [Boolean, true],
                minLength: [Number, 3],
                maxLength: [Number, _constants.MAX_SAFE_INTEGER],
                addOnEnter: [Boolean, true],
                addOnSpace: [Boolean, false],
                addOnComma: [Boolean, true],
                addOnBlur: [Boolean, true],
                addOnPaste: [Boolean, false],
                pasteSplitPattern: [RegExp, /,/],
                allowedTagsPattern: [RegExp, /.+/],
                enableEditingLastTag: [Boolean, false],
                minTags: [Number, 0],
                maxTags: [Number, _constants.MAX_SAFE_INTEGER],
                displayProperty: [String, 'text'],
                keyProperty: [String, ''],
                allowLeftoverText: [Boolean, false],
                addFromAutocompleteOnly: [Boolean, false],
                spellcheck: [Boolean, true]
            });

            console.log('ctrl: ', tiUtil);

            $scope.tagList = new TagList($scope.options, $scope.events, tiUtil.handleUndefinedResult($scope.onTagAdding, true), tiUtil.handleUndefinedResult($scope.onTagRemoving, true), tiUtil, $q);

            this.registerAutocomplete = function () {
                var input = $element.find('input');

                return {
                    addTag: function addTag(tag) {
                        return $scope.tagList.add(tag);
                    },
                    getTags: function getTags() {
                        return $scope.tagList.items;
                    },
                    getCurrentTagText: function getCurrentTagText() {
                        return $scope.newTag.text();
                    },
                    getOptions: function getOptions() {
                        return $scope.options;
                    },
                    getTemplateScope: function getTemplateScope() {
                        return $scope.templateScope;
                    },
                    on: function on(name, handler) {
                        $scope.events.on(name, handler, true);
                        return _this;
                    }
                };
            };

            this.registerTagItem = function () {
                return {
                    getOptions: function getOptions() {
                        return $scope.options;
                    },
                    removeTag: function removeTag(index) {
                        if ($scope.disabled) {
                            return;
                        }
                        $scope.tagList.remove(index);
                    }
                };
            };
        },
        link: function link(scope, element, attrs, ngModelCtrl) {
            var hotkeys = [_constants.KEYS.enter, _constants.KEYS.comma, _constants.KEYS.space, _constants.KEYS.backspace, _constants.KEYS.delete, _constants.KEYS.left, _constants.KEYS.right],
                tagList = scope.tagList,
                events = scope.events,
                options = scope.options,
                input = element.find('input'),
                validationOptions = ['minTags', 'maxTags', 'allowLeftoverText'],
                setElementValidity,
                focusInput;

            setElementValidity = function setElementValidity() {
                ngModelCtrl.$setValidity('maxTags', tagList.items.length <= options.maxTags);
                ngModelCtrl.$setValidity('minTags', tagList.items.length >= options.minTags);
                ngModelCtrl.$setValidity('leftoverText', scope.hasFocus || options.allowLeftoverText ? true : !scope.newTag.text());
            };

            focusInput = function focusInput() {
                $timeout(function () {
                    input[0].focus();
                });
            };

            ngModelCtrl.$isEmpty = function (value) {
                return !value || !value.length;
            };

            scope.newTag = {
                text: function text(value) {
                    if (_angular2.default.isDefined(value)) {
                        scope.text = value;
                        events.trigger('input-change', value);
                    } else {
                        return scope.text || '';
                    }
                },
                invalid: null
            };

            scope.track = function (tag) {
                return tag[options.keyProperty || options.displayProperty];
            };

            scope.getTagClass = function (tag, index) {
                var selected = tag === tagList.selected;
                return [scope.tagClass({
                    $tag: tag,
                    $index: index,
                    $selected: selected
                }), {
                    selected: selected
                }];
            };

            scope.$watch('tags', function (value) {
                if (value) {
                    tagList.items = tiUtil.makeObjectArray(value, options.displayProperty);
                    scope.tags = tagList.items;
                } else {
                    tagList.items = [];
                }
            });

            scope.$watch('tags.length', function () {
                setElementValidity();

                // ngModelController won't trigger validators when the model changes (because it's an array),
                // so we need to do it ourselves. Unfortunately this won't trigger any registered formatter.
                ngModelCtrl.$validate();
            });

            attrs.$observe('disabled', function (value) {
                scope.disabled = value;
            });

            scope.eventHandlers = {
                input: {
                    keyup: function keyup($event) {
                        events.trigger('input-keyup', $event);
                    },
                    focus: function focus() {
                        if (scope.hasFocus) {
                            return;
                        }

                        scope.hasFocus = true;
                        events.trigger('input-focus');
                    },
                    blur: function blur() {
                        $timeout(function () {
                            var activeElement = $document.prop('activeElement'),
                                lostFocusToBrowserWindow = activeElement === input[0],
                                lostFocusToChildElement = element[0].contains(activeElement);

                            if (lostFocusToBrowserWindow || !lostFocusToChildElement) {
                                scope.hasFocus = false;
                                events.trigger('input-blur');
                            }
                        });
                    },
                    paste: function paste($event) {
                        $event.getTextData = function () {
                            var clipboardData = $event.clipboardData || $event.originalEvent && $event.originalEvent.clipboardData;
                            return clipboardData ? clipboardData.getData('text/plain') : $window.clipboardData.getData('Text');
                        };
                        events.trigger('input-paste', $event);
                    }
                },
                host: {
                    click: function click() {
                        if (scope.disabled) {
                            return;
                        }
                        focusInput();
                    }
                },
                tag: {
                    click: function click(tag) {
                        events.trigger('tag-clicked', {
                            $tag: tag
                        });
                    }
                }
            };

            events.on('tag-added', scope.onTagAdded).on('invalid-tag', scope.onInvalidTag).on('tag-removed', scope.onTagRemoved).on('tag-clicked', scope.onTagClicked).on('tag-added', function () {
                scope.newTag.text('');
            }).on('tag-added tag-removed', function () {
                scope.tags = tagList.items;
                // Ideally we should be able call $setViewValue here and let it in turn call $setDirty and $validate
                // automatically, but since the model is an array, $setViewValue does nothing and it's up to us to do it.
                // Unfortunately this won't trigger any registered $parser and there's no safe way to do it.
                ngModelCtrl.$setDirty();
                focusInput();
            }).on('invalid-tag', function () {
                scope.newTag.invalid = true;
            }).on('option-change', function (e) {
                if (validationOptions.indexOf(e.name) !== -1) {
                    setElementValidity();
                }
            }).on('input-change', function () {
                tagList.clearSelection();
                scope.newTag.invalid = null;
            }).on('input-focus', function () {
                element.triggerHandler('focus');
                ngModelCtrl.$setValidity('leftoverText', true);
            }).on('input-blur', function () {
                if (options.addOnBlur && !options.addFromAutocompleteOnly) {
                    tagList.addText(scope.newTag.text());
                }
                element.triggerHandler('blur');
                setElementValidity();
            }).on('input-keyup', function (event) {
                console.log('tags input-keyup: ', event);
                console.log(event);
                var key = event.keyCode,
                    addKeys = {},
                    shouldAdd,
                    shouldRemove,
                    shouldSelect,
                    shouldEditLastTag;

                if (tiUtil.isModifierOn(event) || hotkeys.indexOf(key) === -1) {
                    return;
                }

                addKeys[_constants.KEYS.enter] = options.addOnEnter;
                addKeys[_constants.KEYS.comma] = options.addOnComma;
                addKeys[_constants.KEYS.space] = options.addOnSpace;

                shouldAdd = !options.addFromAutocompleteOnly && addKeys[key];
                shouldRemove = (key === _constants.KEYS.backspace || key === _constants.KEYS.delete) && tagList.selected;
                shouldEditLastTag = key === _constants.KEYS.backspace && scope.newTag.text().length === 0 && options.enableEditingLastTag;
                shouldSelect = (key === _constants.KEYS.backspace || key === _constants.KEYS.left || key === _constants.KEYS.right) && scope.newTag.text().length === 0 && !options.enableEditingLastTag;

                if (shouldAdd) {
                    tagList.addText(scope.newTag.text());
                } else if (shouldEditLastTag) {
                    tagList.selectPrior();
                    tagList.removeSelected().then(function (tag) {
                        if (tag) {
                            scope.newTag.text(tag[options.displayProperty]);
                        }
                    });
                } else if (shouldRemove) {
                    tagList.removeSelected();
                } else if (shouldSelect) {
                    if (key === _constants.KEYS.left || key === _constants.KEYS.backspace) {
                        tagList.selectPrior();
                    } else if (key === _constants.KEYS.right) {
                        tagList.selectNext();
                    }
                }

                if (shouldAdd || shouldSelect || shouldRemove || shouldEditLastTag) {
                    event.preventDefault();
                }
            }).on('input-paste', function (event) {
                if (options.addOnPaste) {
                    var data = event.getTextData();
                    var tags = data.split(options.pasteSplitPattern);

                    if (tags.length > 1) {
                        tags.forEach(function (tag) {
                            tagList.addText(tag);
                        });
                        event.preventDefault();
                    }
                }
            });
        }
    };
};

exports.default = tagsInput;


function TagList(options, events, onTagAdding, onTagRemoving, tiUtil, $q) {
    var self = {},
        getTagText,
        setTagText,
        canAddTag,
        canRemoveTag;

    getTagText = function getTagText(tag) {
        return tiUtil.safeToString(tag[options.displayProperty]);
    };

    setTagText = function setTagText(tag, text) {
        tag[options.displayProperty] = text;
    };

    canAddTag = function canAddTag(tag) {
        var tagText = getTagText(tag);
        var valid = tagText && tagText.length >= options.minLength && tagText.length <= options.maxLength && options.allowedTagsPattern.test(tagText) && !tiUtil.findInObjectArray(self.items, tag, options.keyProperty || options.displayProperty);

        return $q.when(valid && onTagAdding({
            $tag: tag
        })).then(tiUtil.promisifyValue);
    };

    canRemoveTag = function canRemoveTag(tag) {
        return $q.when(onTagRemoving({
            $tag: tag
        })).then(tiUtil.promisifyValue);
    };

    self.items = [];

    self.addText = function (text) {
        var tag = {};
        setTagText(tag, text);
        return self.add(tag);
    };

    self.add = function (tag) {
        var tagText = getTagText(tag);

        if (options.replaceSpacesWithDashes) {
            tagText = tiUtil.replaceSpacesWithDashes(tagText);
        }

        setTagText(tag, tagText);

        return canAddTag(tag).then(function () {
            self.items.push(tag);
            events.trigger('tag-added', {
                $tag: tag
            });
        }).catch(function () {
            if (tagText) {
                events.trigger('invalid-tag', {
                    $tag: tag
                });
            }
        });
    };

    self.remove = function (index) {
        var tag = self.items[index];

        return canRemoveTag(tag).then(function () {
            self.items.splice(index, 1);
            self.clearSelection();
            events.trigger('tag-removed', {
                $tag: tag
            });
            return tag;
        });
    };

    self.select = function (index) {
        if (index < 0) {
            index = self.items.length - 1;
        } else if (index >= self.items.length) {
            index = 0;
        }

        self.index = index;
        self.selected = self.items[index];
    };

    self.selectPrior = function () {
        self.select(--self.index);
    };

    self.selectNext = function () {
        self.select(++self.index);
    };

    self.removeSelected = function () {
        return self.remove(self.index);
    };

    self.clearSelection = function () {
        self.selected = null;
        self.index = -1;
    };

    self.clearSelection();

    return self;
}

function validateType(type) {
    return _constants.SUPPORTED_INPUT_TYPES.indexOf(type) !== -1;
}