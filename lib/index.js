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

require('./ng-tags-input.css');

require('./ng-tags-input.bootstrap.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ngTagsInput = _angular2.default.module('ngTagsInput', []).service('tiUtil', _util2.default).provider('tagsInputConfig', _configuration2.default).directive('autoComplete', _autoComplete2.default).directive('tiAutocompleteMatch', _autoCompleteMatch2.default).directive('tiAutosize', _autosize2.default).directive('tiBindAttrs', _bindAttrs2.default).directive('tiTagItem', _tagItem2.default).directive('tagsInput', _tagsInput2.default).directive('tiTranscludeAppend', _transcludeAppend2.default);
module.exports = ngTagsInput;