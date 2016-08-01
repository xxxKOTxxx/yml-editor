function MainController() {
  let $ctrl = this;
  $ctrl.file = this.file = null;
  $ctrl.data = this.data = null;
  $ctrl.ready = this.ready = false;
}
export const mainComponent = {
  template: require('../views/main'),
  controller: MainController,
  controllerAs: 'main',
  bindings: {}
};