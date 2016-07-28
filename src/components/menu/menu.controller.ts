class MenuCtrl {

  static $inject = ['$scope', 'LoginModalService', 'LoginService'];
  constructor(private $scope: angular.IScope, 
  private loginModalService: LoginModalService, 
  private loginService: LoginService) {

    if (!loginService.isLoggedIn()) {
      this.loginModalService.show();
    }
  }

  logout() {
    this.loginService.logOut();
    this.loginModalService.show();
  }
}

angular.module('resource-mobile').controller('MenuCtrl', MenuCtrl);