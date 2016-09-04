function SettingsController() {
  let $ctrl = this;
  $ctrl.data = this.data;
  $ctrl.ready = this.ready;
  $ctrl.show_table = this.show_table = true;
  let table = $('#collapsing-table');
  function toggleTable(value) {
    let direction = value ? 'show' : 'hide';
    table.collapse(direction);
  }
  function nextStep() {
    if(!$ctrl.data || !$ctrl.ready) {
      return;
    }
    $('#process-link').click();
  }
  function prevStep() {
    $('#file-link').click();
  }
  this.toggleTable = toggleTable;
  this.prevStep = prevStep;
  this.nextStep = nextStep;
}
export const settingsComponent = {
  template: require('../views/settings'),
  controller: SettingsController,
  controllerAs: 'settings',
  bindings: {
    data: '=',
    ready: '='
  }
};