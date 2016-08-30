class PersonnelDetailsController {

  private selected: Personnel;

  private emergencyContacts: any[];

  static $inject=['$scope', '$stateParams']
  constructor(public $scope: angular.IScope, private $stateParams: any) {
    this.selected = $stateParams.personnel;
    this.emergencyContacts = [];
    this.emergencyContacts.push(this.selected.emergency1);
    this.emergencyContacts.push(this.selected.emergency2);
  }

  public call(phoneNum: string) {
    console.log('hello');
    window.location.href= "tel: " + phoneNum;
  }
}

angular.module('resource-mobile').controller('PersonnelDetailsController', PersonnelDetailsController);