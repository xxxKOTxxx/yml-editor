export function FileDropController($element, $timeout) {
  let $ctrl = this;
  $ctrl.file = this.file;
  function handleDragOver(event) {
    if (event !== null) {
      event.preventDefault();
    }
    event.dataTransfer.effectAllowed = 'copy';
    return false;
  }

  function handleDragEnter(event) {
    $(event.target).addClass('over');
    handleDragOver(event);
  }

  function handleDragLeave(event) {
    $(event.target).removeClass('over');
    handleDragOver(event);
  }

  function handleDrop(event) {
    event.stopPropagation();
    event.preventDefault();
    $(event.target).removeClass('over');
    let files = event.dataTransfer.files;
    let file = files[0];
    $timeout(function() {
      $ctrl.file = file;
    });
  }

  this.handleDragEnter = handleDragEnter;
  this.handleDragOver = handleDragOver;
  this.handleDragLeave = handleDragLeave;
  this.handleDrop = handleDrop;

  $element.bind('dragenter', handleDragEnter);
  $element.bind('dragover', handleDragOver);
  $element.bind('dragleave', handleDragLeave);
  $element.bind('drop', handleDrop);
}
export const fileDropComponent = {
  template: require('../views/file_drop'),
  controller: FileDropController,
  controllerAs: 'file_drop',
  bindings: {
    file: '='
  }
};