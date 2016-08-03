require('../stylus/index.styl');

// require('socket.io');
require('angular-cookies');
require('angular-translate');
require('angular-translate-storage-local');
require('angular-translate-storage-cookie');

require("bootstrap-webpack!../../bootstrap.config.js");

require('xlsx/dist/xlsx.full.min');

import angular from 'angular';

import { headerComponent } from './components/header';

import { mainComponent } from './components/main';

import { fileComponent } from './components/file';
import { fileDropComponent } from './components/file_drop';
import { fileInputComponent } from './components/file_input';
import { fileDataComponent } from './components/file_data';

import { settingsComponent } from './components/settings';
import { settingsDataComponent } from './components/settings_data';
import { settingsTableComponent } from './components/settings_table';

import { translateConfiguration } from './configurations/translate_configuration';

import { XlsxToJsonService } from './services/xlsx_to_json';

import { fileSize } from './filters/file_size';

const app = angular.module('app', ['ngCookies', 'pascalprecht.translate']);
// const app = angular.module('app', ['btford.socket-io', 'ngCookies', 'pascalprecht.translate']);

app
  .component('header', headerComponent)

  .component('main', mainComponent)
  
  .component('file', fileComponent)
  .component('fileDrop', fileDropComponent)
  .component('fileInput', fileInputComponent)
  .component('fileData', fileDataComponent)

  .component('settings', settingsComponent)
  .component('settingsData', settingsDataComponent)
  .component('settingsTable', settingsTableComponent)

  .config(translateConfiguration)

  .service('XlsxToJson', XlsxToJsonService)

  .filter('fileSize', fileSize);
