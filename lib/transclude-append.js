'use strict';

/**
 * @ngdoc directive
 * @name tiTranscludeAppend
 * @module ngTagsInput
 *
 * @description
 * Re-creates the old behavior of ng-transclude. Used internally by tagsInput directive.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tiTranscludeAppend = function tiTranscludeAppend() {
  return {
    link: function link(scope, element, attrs, ctrl, transcludeFn) {
      transcludeFn(function (clone) {
        element.append(clone);
      });
    }
  };
};

exports.default = tiTranscludeAppend;