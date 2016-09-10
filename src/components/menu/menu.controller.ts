class MenuCtrl {

  static $inject = ['$scope', 'LoginModalService', 'LoginService'];
  constructor(private $scope: angular.IScope, 
  private loginModalService: LoginModalService, 
  private loginService: LoginService) {  }

  logout() {
    this.loginService.logOut();
    this.loginModalService.show();
  }
}

angular.module('resource-mobile').controller('MenuCtrl', MenuCtrl);