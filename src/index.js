import angular from 'angular';
import AutoComplete from './auto-complete';
import AutoCompleteMatch from './auto-complete-match';
import AutoSize from './autosize';
import BindAttrs from './bind-attrs';
import TagItem from './tag-item';
import TagsInput from './tags-input';
import TranscludeAppend from './transclude-append';
import tiUtil from './util';
import tagsInputConfig from './configuration';

var ngTagsInput = angular.module('ngTagsInput', [])
    .service('tiUtil', tiUtil)
    .provider('tagsInputConfig', tagsInputConfig)
    .directive('tiAutocompleteMatch', AutoCompleteMatch)
    .directive('autoComplete', AutoComplete)
    .directive('tiAutosize', AutoSize)
    .directive('tiBindAttrs', BindAttrs)
    .directive('tiTagItem', TagItem)
    .directive('tagsInput', TagsInput)
    .directive('tiTranscludeAppend', TranscludeAppend);
ngTagsInput.run(["$templateCache", function($templateCache) {
    $templateCache.put('ngTagsInput/tags-input.html',
        "<div class=\"host\" tabindex=\"-1\" ng-click=\"eventHandlers.host.click()\" ti-transclude-append><div class=\"tags\" ng-class=\"{focused: hasFocus}\"><ul class=\"tag-list\"><li class=\"tag-item\" ng-repeat=\"tag in tagList.items track by track(tag)\" ng-class=\"getTagClass(tag, $index)\" ng-click=\"eventHandlers.tag.click(tag)\"><ti-tag-item scope=\"templateScope\" data=\"::tag\"></ti-tag-item></li></ul><input class=\"input\" autocomplete=\"off\" ng-model=\"newTag.text\" ng-model-options=\"{getterSetter: true}\" ng-keydown=\"eventHandlers.input.keydown($event)\" ng-focus=\"eventHandlers.input.focus($event)\" ng-blur=\"eventHandlers.input.blur($event)\" ng-paste=\"eventHandlers.input.paste($event)\" ng-trim=\"false\" ng-class=\"{'invalid-tag': newTag.invalid}\" ng-disabled=\"disabled\" ti-bind-attrs=\"{type: options.type, placeholder: options.placeholder, tabindex: options.tabindex, spellcheck: options.spellcheck}\" ti-autosize></div></div>"
    );

    $templateCache.put('ngTagsInput/tag-item.html',
        "<span ng-bind=\"$getDisplayText()\"></span> <a class=\"remove-button\" ng-click=\"$removeTag()\" ng-bind=\"::$$removeTagSymbol\"></a>"
    );

    $templateCache.put('ngTagsInput/auto-complete.html',
        "<div class=\"autocomplete\" ng-if=\"suggestionList.visible\"><ul class=\"suggestion-list\"><li class=\"suggestion-item\" ng-repeat=\"item in suggestionList.items track by track(item)\" ng-class=\"getSuggestionClass(item, $index)\" ng-click=\"addSuggestionByIndex($index)\" ng-mouseenter=\"suggestionList.select($index)\"><ti-autocomplete-match scope=\"templateScope\" data=\"::item\"></ti-autocomplete-match></li></ul></div>"
    );

    $templateCache.put('ngTagsInput/auto-complete-match.html',
        "<span ng-bind-html=\"$highlight($getDisplayText())\"></span>"
    );
}]);
module.exports = ngTagsInput;
