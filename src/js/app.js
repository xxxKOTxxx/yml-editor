require('../stylus/index.styl');

require("bootstrap-webpack!../../bootstrap.config.js");

require('angular-cookies');
require('angular-translate');
require('angular-translate-storage-local');
require('angular-translate-storage-cookie');

require('xlsx/dist/xlsx.full.min');

import angular from 'angular';

import { appHeaderComponent } from './components/header';

import { mainComponent } from './components/main';

import { fileComponent } from './components/file';
import { fileDropComponent } from './components/file_drop';
import { fileInputComponent } from './components/file_input';
import { fileDataComponent } from './components/file_data';

import { settingsComponent } from './components/settings';
import { settingsDataComponent } from './components/settings_data';
import { settingsTableComponent } from './components/settings_table';

import { processComponent } from './components/process';

import { appFooterComponent } from './components/footer';

import { translateConfiguration } from './configurations/translate_configuration';

import { XlsxToJsonService } from './services/xlsx_to_json';
import { socket } from './services/socket';

import { fileSize } from './filters/file_size';

const app = angular.module('app', ['ngCookies', 'pascalprecht.translate']);

app
  .component('appHeader', appHeaderComponent)

  .component('main', mainComponent)
  
  .component('file', fileComponent)
  .component('fileDrop', fileDropComponent)
  .component('fileInput', fileInputComponent)
  .component('fileData', fileDataComponent)

  .component('settings', settingsComponent)
  .component('settingsData', settingsDataComponent)
  .component('settingsTable', settingsTableComponent)
  
  .component('process', processComponent)

  .component('appFooter', appFooterComponent)

  .config(translateConfiguration)

  .service('socket', socket)
  .service('XlsxToJson', XlsxToJsonService)

  .filter('fileSize', fileSize);
