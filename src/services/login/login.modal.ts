class LoginModalService {

  private modal: ionic.modal.IonicModalController;

  static $inject = ['$rootScope', '$ionicModal']
  constructor(private $scope: angular.IScope,
  private $ionicModal: ionic.modal.IonicModalService) {
    this.modal = null;
  }

  private create(): angular.IPromise<ionic.modal.IonicModalController> {
    return this.$ionicModal.fromTemplateUrl('components/login/login.component.html', {
      scope: this.$scope
    }).then(modal => {
      this.modal = modal;
      return modal;
    })
  }

  public show(): void {
    if (this.modal) {
      this.modal.show();
      return;
    }

    this.create().then(modal => {
      modal.show();
    });
  }

  public hide(): void {
    if (this.modal) {
      this.modal.hide();
    }
  }

  public remove(): void {
    if (this.modal) {
      this.modal.remove();
      this.modal = null;
    }
  }
}

angular.module('resource-mobile').service('LoginModalService', LoginModalService);