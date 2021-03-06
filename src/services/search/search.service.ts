interface SearchRes {
  data: {
    personnels?: Personnel[],
    jobDescriptions?: JobDescription[]
  }
};

class SearchService {

  private searchFields: SearchField[];

  static $inject = ['$http', 'serverUrl', 'RoleService']
  constructor(private $http: angular.IHttpService,
  private serverUrl: any,
  private roleService: any) {
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
      }
    );
  }

  public getSearchFields(): SearchField[] {
    return this.searchFields;
  }

  public getAllPersonnel(): angular.IPromise<Personnel[]> {
    return this.$http.post(this.serverUrl.get() + '/api/searchPersonnel', {
      'personnelName': '.*'
    }).then((res: SearchRes) => {
      return this.addLastRole(res.data.personnels);
    })
  }

  public personnelSearch(personnelQuery: Query[]): angular.IPromise<Personnel[]> {

    var queryTerms = {};

    _.each(personnelQuery, (query) => {
      if (query.field.searchArrayKey) {
        this.addArraySearchTerm(query, queryTerms);
      } else {
        queryTerms[query.field.searchKey] = query.term;
      }
    });
    
    return this.$http.post(this.serverUrl.get() + '/api/searchPersonnel', queryTerms).then((matchingPersonnels: SearchRes) => {
      var personnels = matchingPersonnels.data.personnels;

      return this.addLastRole(personnels);
    });
  }

  public getAllJobs(): angular.IPromise<JobDescription[]> {
    return this.$http.get(this.serverUrl.get() + '/api/jobDescriptions', {
      params: {
        searchKey: '.*'
      }
    }).then((res: SearchRes) => {
      return res.data.jobDescriptions;
    });
  }

  public jobSearch(query: Query): angular.IPromise<JobDescription[]> {
    return this.$http.get(this.serverUrl.get() + '/api/jobDescriptions', {params: {searchKey: query.term}}).then((jobs: SearchRes) => {
      return jobs.data.jobDescriptions;
    });
  }

  private addArraySearchTerm(query: Query, queryTerms: any) {
    var obj = {};
    
    if (!queryTerms[query.field.searchKey]) {
      queryTerms[query.field.searchKey] = [];
    }
    
    obj[query.field.searchArrayKey] = query.term;
    queryTerms[query.field.searchKey].push(obj);
  }

  private addLastRole(personnels: Personnel[]): Personnel[] {
    return _.each(personnels, personnel => {
      personnel.currentRole = this.roleService.latestRole(personnel);
    });
  }
  
}

angular.module('resource-mobile').service('SearchService', SearchService);