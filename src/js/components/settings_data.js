function SettingsDataController() {
  let $ctrl = this;
  $ctrl.data = this.data;
}
export const settingsDataComponent = {
  template: require('../views/settings_data'),
  controller: SettingsDataController,
  controllerAs: 'settings_data',
  bindings: {
    data: '='
  }
};