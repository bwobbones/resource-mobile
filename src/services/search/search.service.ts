interface SearchField {
  searchType: string,
  type: string,
  searchKey: string,
  shortcut: string,
  searchArrayKey?: string
}

class SearchService {

  private searchFields: SearchField[];

  static $inject = []
  constructor() {
    this.searchFields = [];
    this.searchFields.push(
      {
        searchType: 'personnel',
        type: 'Surname',
        searchKey: 'personnelName',
        shortcut: 's'
      },
      {
        searchType: 'personnel',
        type: 'Similar Position',
        searchKey: 'similarPosition',
        shortcut: 'p'
      },
      {
        searchType: 'personnel',
        type: 'Keyword',
        searchKey: 'keywords',
        shortcut: 'k'
      },
      {
        searchType: 'personnel',
        type: 'Occupation',
        searchKey: 'occupation',
        shortcut: 'o'
      },
      {
        searchType: 'personnel',
        type: 'Qualification',
        searchKey: 'qualifications',
        searchArrayKey: 'name',
        shortcut: 'q'
      },
      {
        searchType: 'job',
        type: 'Job',
        searchKey: 'job',
        shortcut: 'j'
      }
    );
  }

  public getSearchFields(): SearchField[] {
    return this.searchFields;
  }
}

angular.module('resource-mobile').service('SearchService', SearchService);