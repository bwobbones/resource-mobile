interface SearchControllerScope extends angular.IScope{
  currentSearch: Search,
  searchFields: SearchField[],
  modal: ionic.modal.IonicModalController
  fieldSelected: Function;
}

interface Search {
  field: SearchField,
  term: string
}

class SearchController {

  public currentSearch: Search;

  public searchFields: SearchField[];

  public personnelQueries: Search[];

  public jobQuery: Search;

  private modal: ionic.modal.IonicModalController;

  static $inject = ['$scope', '$ionicModal', 'SearchService']
  constructor(private $scope: SearchControllerScope,
  private $ionicModal: ionic.modal.IonicModalService,
  private searchService: SearchService) {

    this.searchFields = searchService.getSearchFields();
    this.currentSearch = {
      field: this.searchFields[0],
      term: ''
    };

    this.personnelQueries = [];
    this.jobQuery = null;
  }

  public showSelectModal() {
    this.$scope.currentSearch = this.currentSearch;

    if (this.modal) {
      this.modal.show();
      return;
    }
    
    // Use scope for data binding in the modal. I'm not sure if there's a more typescripty way
    // to do this.
    this.$scope.searchFields = this.searchFields;
    this.$scope.fieldSelected = () => {
      if (this.currentSearch.field.searchType === 'personnel') {
        this.jobQuery = null;
      } else {
        this.personnelQueries = [];
      }

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
    if (this.currentSearch.field.searchType === 'personnel') {
      this.personnelQueries.push(_.clone(this.currentSearch));
    } else {
      this.jobQuery = _.clone(this.currentSearch);
    }

    this.currentSearch.term = '';
  }

  public clearPersonnelQueries() {
    this.personnelQueries = [];
  }

  public clearJobQuery() {
    this.jobQuery = null;
  }
}


angular.module('resource-mobile').controller('SearchController', SearchController);