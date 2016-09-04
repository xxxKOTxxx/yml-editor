function ProcessController(socket) {
  let $ctrl = this;
  $ctrl.data = this.data;
  $ctrl.remove_code = this.remove_code = true;
  $ctrl.minification = this.minification = false;
  $ctrl.url = this.url;

  function getData() {
    let url = $ctrl.url;
    let categories = $ctrl.data.Categories;
    let products = $ctrl.data.Products;
    let remove_code = $ctrl.remove_code;
    let minification = $ctrl.minification;
    return {
      url: url,
      categories: categories,
      products: products,
      remove_code: remove_code,
      minification: minification,
    };
  }

  function sendData() {
    let data = getData();
    socket.emit('process', data);
  }
  this.sendData = sendData;


  socket.on('run', function(data) {
      console.log('status', data);
    });
  socket.on('error', function(data) {
      console.log('Error', data);
    });
}
export const processComponent = {
  template: require('../views/process'),
  controller: ProcessController,
  controllerAs: 'process',
  bindings: {
    data: '='
  }
};