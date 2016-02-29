import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';


@inject(HttpClient)
export class App {
  

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.github.com/');
    });

    this.http = http;
  }

  activate() {
    var repos;
    return this.http.fetch('orgs/leerbedrijflisa/repos')
    .then(response => response.json())
    .then(repos => this.repos = repos);
  }
}