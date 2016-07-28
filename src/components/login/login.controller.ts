interface LoginForm {
  username: string,
  password: string
};

class LoginCtrl {

  private loginForm: LoginForm;

  private error: boolean;

  static $inject = ['$scope', '$http', 'LoginService', 'LoginModalService'];
  constructor(private $scope: angular.IScope,
    private $http: angular.IHttpService,
    private loginService: LoginService,
    private loginModal: LoginModalService) { 
      this.error = false;
    }

  doLogin() {
    this.loginService.logIn(this.loginForm).then((user: User) => {
      if (user) {
        this.loginModal.remove();
      } else {
        this.error = true;
        this.loginForm.password = "";
      }
    });
  }
}

angular.module('resource-mobile').controller('LoginCtrl', LoginCtrl);