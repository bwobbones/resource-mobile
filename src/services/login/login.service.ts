interface LoginRes {
  data: {
    success: boolean,
    token: string,
    user: User
  }
};

class LoginService {


  static $inject = ['$http', 'localStorageService', 'serverUrl'];
  constructor(private $http: angular.IHttpService,
    private localStorageService: angular.local.storage.ILocalStorageService,
    private serverUrl: any) { 
    }

    public logIn({username, password}): angular.IPromise<User> {
      return this.$http.post(this.serverUrl.get() + '/login', {
        username: username,
        password: password
      }).then((res: LoginRes) => {
        if(!res.data.success) {
          return null;
        } else {
          this.localStorageService.set('authToken', res.data.token);
          this.localStorageService.set('user', res.data.user);
          return res.data.user;
        }
      });
    }
  
    public logOut(): void {
      this.localStorageService.remove('authToken');
      this.localStorageService.remove('user');
    }

    public getLoggedInUser(): User {
      return <User>this.localStorageService.get('user');
    }

    public getAccessToken(): string {
      return <string>this.localStorageService.get('authToken');
    }

    public isLoggedIn(): boolean {
      return !_.isEmpty(this.getLoggedInUser());
    }
}

angular.module('resource-mobile').service('LoginService', LoginService);