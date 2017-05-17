'use strict';

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _autoComplete = require('./auto-complete');

var _autoComplete2 = _interopRequireDefault(_autoComplete);

var _autoCompleteMatch = require('./auto-complete-match');

var _autoCompleteMatch2 = _interopRequireDefault(_autoCompleteMatch);

var _autosize = require('./autosize');

var _autosize2 = _interopRequireDefault(_autosize);

var _bindAttrs = require('./bind-attrs');

var _bindAttrs2 = _interopRequireDefault(_bindAttrs);

var _tagItem = require('./tag-item');

var _tagItem2 = _interopRequireDefault(_tagItem);

var _tagsInput = require('./tags-input');

var _tagsInput2 = _interopRequireDefault(_tagsInput);

var _transcludeAppend = require('./transclude-append');

var _transcludeAppend2 = _interopRequireDefault(_transcludeAppend);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _configuration = require('./configuration');

var _configuration2 = _interopRequireDefault(_configuration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ngTagsInput = _angular2.default.module('ngTagsInput', []).service('tiUtil', _util2.default).provider('tagsInputConfig', _configuration2.default).directive('tiAutocompleteMatch', _autoCompleteMatch2.default).directive('autoComplete', _autoComplete2.default).directive('tiAutosize', _autosize2.default).directive('tiBindAttrs', _bindAttrs2.default).directive('tiTagItem', _tagItem2.default).directive('tagsInput', _tagsInput2.default).directive('tiTranscludeAppend', _transcludeAppend2.default);
ngTagsInput.run(["$templateCache", function ($templateCache) {
    $templateCache.put('ngTagsInput/tags-input.html', "<div class=\"host\" tabindex=\"-1\" ng-click=\"eventHandlers.host.click()\" ti-transclude-append><div class=\"tags\" ng-class=\"{focused: hasFocus}\"><ul class=\"tag-list\"><li class=\"tag-item\" ng-repeat=\"tag in tagList.items track by track(tag)\" ng-class=\"getTagClass(tag, $index)\" ng-click=\"eventHandlers.tag.click(tag)\"><ti-tag-item scope=\"templateScope\" data=\"::tag\"></ti-tag-item></li></ul><input class=\"input\" autocomplete=\"off\" ng-model=\"newTag.text\" ng-model-options=\"{getterSetter: true}\" ng-keydown=\"eventHandlers.input.keydown($event)\" ng-focus=\"eventHandlers.input.focus($event)\" ng-blur=\"eventHandlers.input.blur($event)\" ng-paste=\"eventHandlers.input.paste($event)\" ng-trim=\"false\" ng-class=\"{'invalid-tag': newTag.invalid}\" ng-disabled=\"disabled\" ti-bind-attrs=\"{type: options.type, placeholder: options.placeholder, tabindex: options.tabindex, spellcheck: options.spellcheck}\" ti-autosize></div></div>");

    $templateCache.put('ngTagsInput/tag-item.html', "<span ng-bind=\"$getDisplayText()\"></span> <a class=\"remove-button\" ng-click=\"$removeTag()\" ng-bind=\"::$$removeTagSymbol\"></a>");

    $templateCache.put('ngTagsInput/auto-complete.html', "<div class=\"autocomplete\" ng-if=\"suggestionList.visible\"><ul class=\"suggestion-list\"><li class=\"suggestion-item\" ng-repeat=\"item in suggestionList.items track by track(item)\" ng-class=\"getSuggestionClass(item, $index)\" ng-click=\"addSuggestionByIndex($index)\" ng-mouseenter=\"suggestionList.select($index)\"><ti-autocomplete-match scope=\"templateScope\" data=\"::item\"></ti-autocomplete-match></li></ul></div>");

    $templateCache.put('ngTagsInput/auto-complete-match.html', "<span ng-bind-html=\"$highlight($getDisplayText())\"></span>");
}]);
module.exports = ngTagsInput;