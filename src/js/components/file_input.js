function FileInputController($timeout) {
  let $ctrl = this;
  $ctrl.file = this.file;
  this.input = null;
  function fileHandler(event) {
    console.log('fileHandler',event[0])
    $timeout(function() {
      $ctrl.file = event[0];
    });
  };

  function selectFile() {
    $('#file').click();
  };

  this.fileHandler = fileHandler;
  this.selectFile = selectFile;
}
export const fileInputComponent = {
  template: require('../views/file_input'),
  controller: FileInputController,
  controllerAs: 'file_input',
  bindings: {
    file: '='
  }
};