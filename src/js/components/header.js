function AppHeaderController($translate) {
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
export const appHeaderComponent = {
  template: require('../views/header'),
  controller: AppHeaderController,
  controllerAs: 'header',
  bindings: {}
};