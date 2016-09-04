function appFooterController($scope, socket) {
  let $ctrl = this;
  $ctrl.connect = false;
  $ctrl.connection = 'disconnected';
// console.log('connected', socket.connected());
  function setConnected() {
console.log('connected!');
    $ctrl.connect = true;
    $ctrl.connection = 'connected';
    $scope.$apply();
  }
  function setDisconnected() {
console.log('disconnected!');
    $ctrl.connect = false;
    $ctrl.connection = 'disconnected';
    $scope.$apply();
  }
  socket.on('connect', setConnected);
  socket.on('disconnect', setDisconnected);

}
export const appFooterComponent = {
  template: require('../views/footer'),
  controller: appFooterController,
  controllerAs: 'footer',
  bindings: {}
};