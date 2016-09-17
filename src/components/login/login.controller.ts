class LoginForm {
  username: string;
  password: string;
};

class LoginCtrl {

  private loginForm: LoginForm;

  private loggingIn: boolean;

  private error: boolean;

  static $inject = ['$scope', '$http', 'LoginService', 'LoginModalService'];
  constructor(private $scope: angular.IScope,
    private $http: angular.IHttpService,
    private loginService: LoginService,
    private loginModal: LoginModalService) { 
      this.error = false;
      this.loggingIn = false;
      this.loginForm = new LoginForm();

      var lastUser = loginService.getLoggedInUser();
      if (lastUser) {
        this.loginForm.username = lastUser.username;
      }

      window.addEventListener('native.keyboardshow', function(){
        // Ionic delays this by default
        document.body.classList.add('keyboard-open');
      });
    }

  doLogin() {
    this.loggingIn = true;
    this.loginService.logIn(this.loginForm).then((user: User) => {
      if (user) {
        this.loginModal.remove();
        this.$scope.$emit('logged-in');
      } else {
        this.error = true;
        this.loginForm.password = "";
      }
      this.loggingIn = false;
    });
  }
}

angular.module('resource-mobile').controller('LoginCtrl', LoginCtrl);