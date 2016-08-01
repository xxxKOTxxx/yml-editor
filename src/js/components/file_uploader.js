function FileUploaderController($scope, $element, $attrs, $parse, XlsxToJson) {
  let ctrl = this;
  ctrl.file = null;
  ctrl.data = null;

  let settings = {
    mime_types: [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
      'application/vnd.ms-excel.sheet.macroenabled.12',
      'application/vnd.oasis.opendocument.spreadsheet',
      'application/vnd.ms-excel',
      'application/xml'
    ],
    max_file_size: 100,
  };

  $scope.errors = {
    mime_type: {
      valid: true,
      message: 'Invalid file type. File must be one of following types: XLS / XLSX / XLSB / XLSM / XML / ODS'
    },
    file_size: {
      valid: true,
      message: 'File must be smaller than ' + settings.max_file_size + ' MB'
    }
  };

  $scope.hideError = function(error) {
    error.valid = true;
  };

  function checkMimeType(mime_type) {
    let result = false;
    if((settings.mime_types === (void 0) || settings.mime_types === '') || settings.mime_types.indexOf(mime_type) > -1) {
      result = true;
    }
    $scope.errors.mime_type.valid = result;
    return result;
  };

  function checkFileSize(file_size) {
    let result = false;
    if((settings.max_file_size === (void 0) || settings.max_file_size === '') || (file_size / 1024) / 1024 < settings.max_file_size) {
      result = true;
    }
    $scope.errors.file_size.valid = result;
    return result;
  };

  function checkFile(file) {
    let size_valid = ctrl.checkFileSize(file.size);
    let type_valid = ctrl.checkMimeType(file.type);
    return size_valid && type_valid
  };

  function handleFile(file) {
    console.log('handleFile',file)
    if(file === null) {
      $scope.errors.file_size.valid = true;
      $scope.errors.mime_type.valid = true;
      return;
    }
    file.valid = ctrl.checkFile(file);
    if(file.valid) {
      XlsxToJson.getData(file)
        .then(function(data) {
          ctrl.data = data;
          $scope.$apply();
        });
    }
  };

  ctrl.checkMimeType = checkMimeType;
  ctrl.checkFileSize = checkFileSize;
  ctrl.checkFile = checkFile;
  ctrl.handleFile = handleFile;


  $scope.$watch('file_uploader.file', handleFile)
}
export const fileUploaderComponent = {
    template: require('../views/file_uploader.pug'),
    controller: FileUploaderController,
    controllerAs: 'file_uploader',
    bindings: {}
};