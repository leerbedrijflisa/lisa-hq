import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class App {
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Aurelia';
    config.map([
      { route: 'test',            name: 'test',      moduleId: 'test',   nav: true },
      { route: 'users',            name: 'users',      moduleId: 'users',   nav: true },
      { route: ['', 'home'],            name: 'github',      moduleId: 'github',   nav: true },
      { route: 'users/:id/detail', name: 'userDetail', moduleId: 'users/detail' },
      { route: 'files*path',       name: 'files',      moduleId: 'files/index',   href:'#files',   nav: true },
      { route: 'repo/:repoId/:boardId/', name: 'repo', moduleId: 'repo',   nav: false },
      { route: 'repo/branch/:branchId/', name: 'branch', moduleId: 'branch',   nav: false }

    ]);
  }

  // constructor(http) {
  //   http.configure(config => {
  //     config
  //       .useStandardConfiguration()
  //       .withBaseUrl('https://api.trello.com/1/');
  //   });

  //   this.http = http;
  // }

  // activate() {
  //   var boards;
  //   return this.http.fetch('organizations/davincilisa/boards?key=8c37986e472cbf396b4cbde902b1d877&token=b331c1c3c659bec8bbd2cbe36108108330f0db66cfe1e6b2a15c3628fab2759a')
  //   .then(response => response.json())
  //   .then(boards => this.boards = boards);
  // }
}