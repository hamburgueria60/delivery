/**
 * Created by Richard Lopes on 27/12/2015.
 */

const app = angular.module('app')
app.directive('editable', EditableDirective)

function EditableDirective() {
  return {
    link(scope, element, attrs, modelCtrl) {
      $(element).attr('contenteditable', 'true')
    },
  }
}
