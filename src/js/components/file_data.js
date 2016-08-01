function FileDataController($scope, $element, $filter) {
  let $ctrl = this;
  $ctrl.file = this.file;
  $ctrl.data = this.data;
  function removeFile() {
    $ctrl.file = null;
  }
  function nextStep() {
    if(!$ctrl.data) {
      return;
    }
    $('#settings-link').click();
  }
  this.removeFile = removeFile;
  this.nextStep = nextStep;
}
export const fileDataComponent = {
    template: require('../views/file_data.pug'),
    controller: FileDataController,
    controllerAs: 'file_data',
    bindings: {
      file: '=',
      data: '='
    }
};