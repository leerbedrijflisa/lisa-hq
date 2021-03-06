import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';


@inject(HttpClient)
export class Home {
  

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.trello.com/1/');
    });

    this.http = http;
  }

  activate() {
    var boards;
    return this.http.fetch('organizations/davincilisa/boards?key=8c37986e472cbf396b4cbde902b1d877&token=b331c1c3c659bec8bbd2cbe36108108330f0db66cfe1e6b2a15c3628fab2759a')
    .then(response => response.json())
    .then(boards => this.boards = boards);
  }
}