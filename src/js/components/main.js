function MainController() {
  let $ctrl = this;
  $ctrl.file = this.file = null;
  $ctrl.data = this.data = null;
  $ctrl.ready = this.ready = false;

  $(".panel").on("show.bs.collapse hide.bs.collapse", function(event) {
    if(event.type=='show'){
      $(this).addClass('active');
    }
    else{
      $(this).removeClass('active');
    }
  });
}
export const mainComponent = {
  template: require('../views/main'),
  controller: MainController,
  controllerAs: 'main',
  bindings: {}
};