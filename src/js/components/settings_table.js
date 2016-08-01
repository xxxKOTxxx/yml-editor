function SettingsTableController() {
  let $ctrl = this;
  $ctrl.table = this.table;
  console.log('$ctrl.table',$ctrl.table)
}
export const settingsTableComponent = {
  template: require('../views/settings_table'),
  controller: SettingsTableController,
  controllerAs: 'settings_table',
  bindings: {
    table: '='
  }
};