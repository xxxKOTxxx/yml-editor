function HeaderController($translate) {
  let $ctrl = this;

  function getLanguage() {
    return $translate.use();
  }
  function setLanguage(language) {
    let current_language = getLanguage();
    if(current_language == language) {
      return;
    }
    $translate.fallbackLanguage(current_language);
    $translate.use(language);
  }
  
  this.setLanguage = setLanguage;
  this.getLanguage = getLanguage;
}
export const headerComponent = {
  template: require('../views/header'),
  controller: HeaderController,
  controllerAs: 'header',
  bindings: {}
};