require('../index.pug');
require('../stylus/index.styl');
require('bootstrap-webpack');
require('xlsx/dist/xlsx.full.min');

import angular from 'angular';
import { fileUploaderComponent } from './components/file_uploader';
import { dragAndDropComponent } from './components/drag_and_drop';
import { fileInputComponent } from './components/file_input';
import { fileDataComponent } from './components/file_data';
import { XlsxToJsonService } from './services/xlsx_to_json';
import { fileSize } from './filters/file_size';
const app = angular.module('app', []);
app
  .component('fileUploader', fileUploaderComponent)
  .component('dragAndDrop', dragAndDropComponent)
  .component('fileInput', fileInputComponent)
  .component('fileData', fileDataComponent)
  .service('XlsxToJson', XlsxToJsonService)
  .filter('fileSize', fileSize);