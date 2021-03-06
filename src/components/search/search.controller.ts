interface SearchControllerScope extends angular.IScope{
  currentSearch: Query,
  searchFields: SearchField[],
  modal: ionic.modal.IonicModalController
  fieldSelected: Function;
}

interface Query {
  field: SearchField,
  term: string
}

class SearchController {

  public currentSearch: Query;

  public searchFields: SearchField[];

  public personnelQueries: Query[];

  public personnelResults: Personnel[];

  private modal: ionic.modal.IonicModalController;

  private loading: boolean;

  static $inject = ['$scope', '$rootScope', '$ionicModal', 'SearchService', '$state']
  constructor(private $scope: SearchControllerScope,
  private $rootScope: angular.IScope,
  private $ionicModal: ionic.modal.IonicModalService,
  private searchService: SearchService,
  private $state) {
    this.loading = false;

    this.searchFields = searchService.getSearchFields();
    this.currentSearch = {
      field: this.searchFields[0],
      term: ''
    };

    this.personnelQueries = [];

    this.$rootScope.$on('logged-in', () => {
      this.clearPersonnelSearch();
      this.showAllPersonnel();
    });

    this.showAllPersonnel();
  }

  public showSelectModal() {
    this.$scope.currentSearch = this.currentSearch;

    if (this.modal) {
      this.modal.show();
      return;
    }
    
    this.$scope.searchFields = this.searchFields;
    this.$scope.fieldSelected = () => {
      this.modal.hide();
    };
    this.$ionicModal.fromTemplateUrl('components/search/search.modal.html', {
      scope: this.$scope
    }).then(modal => {
      this.modal = modal;
      this.$scope.modal = this.modal;
      modal.show();
    });
  }

  public search() {
    this.loading = true;
    var search = _.clone(this.currentSearch)
    var index = _.findIndex(this.personnelQueries, e => {
      return e.field.searchKey === search.field.searchKey;
    });

    if (index === -1) {
      this.personnelQueries.push(search);
    } else {
      this.personnelQueries[index] = search;
    }

    this.searchService.personnelSearch(this.personnelQueries).then(personnels => {
      this.personnelResults = personnels;
      this.loading = false;
    });

    this.currentSearch.term = '';
  }

  private showAllPersonnel() {
    this.loading = true;
    this.searchService.getAllPersonnel().then(personnels => {
      this.personnelResults = personnels;
      this.loading = false;
    });
  }

  public clearPersonnelSearch() {
    this.personnelQueries = [];
    this.personnelResults = [];
    this.showAllPersonnel();
  }

  public showPersonnel(selected: Personnel) {
    this.$state.go('personnel', {
      personnel: selected
    });
  }
}


angular.module('resource-mobile').controller('SearchController', SearchController);