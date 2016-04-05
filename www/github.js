import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

export class Github {
  constructor() {
    this.http = new HttpClient;
    this.http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.github.com/');
    });
  }

  activate() {
    var repos = this.http.fetch('orgs/leerbedrijflisa/repos?per_page=1000')
    .then(response => response.json())
    .then(repos => this.repos = repos);
    var trello = new Trello;
    trello.getBoards().then(boardList => this.boards = boardList);

    var boards = trello.getBoards();
    var _this = this;
    //add github repo to the associated trello board (works)
    Promise.all([boards, repos]).then(function(values) {
      _this.arrayList = [];
      var count = 0;
      for (var i in values[0]) {
        for (var a in values[1]) {
          if (values[1][a].hasOwnProperty("name"))
          {
            var repo = values[1][a].name.toLowerCase();
            var board = values[0][i]['name'].toLowerCase();

            count++;
            if (repo == board)
            {
              _this.itemList = [];
              _this.trello = [];
              _this.github = [];
              _this.trello['trello'] = values[0][i];
              _this.github['github'] = values[1][a];
              _this.github['github']['test'] = "test";
              _this.github['github']['updated_at'] = timeSince(_this.github['github']['updated_at']);


              Array.push(_this.itemList, _this.github, _this.trello);
              //_this.itemList.push({'github': _this.github}, {'trello': _this.trello});
              //_this.itemList.push({'trello': _this.trello});

              // _this.combinedList['github'] = repo;
              // _this.combinedList['trello'] = board;
              _this.arrayList.push({'trello': values[0][i], 'github': values[1][a]});

            };

          }
        };
      };
    });


    //this list is always empty (The problem)
    this.title = "Trello Boards";


function timeSince(date) {

  var newDate = new Date(date).getTime();

  var seconds = Math.floor((new Date().getTime()/1000) - (newDate/1000));

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
      return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
      return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
      return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
      return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
      return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

}
}

export class Trello {
  constructor() {
    this.http = new HttpClient;
    this.http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.trello.com/1/');
    });
  }

  getBoards() {
    return this.http.fetch('organizations/davincilisa/boards?key=8c37986e472cbf396b4cbde902b1d877&token=b331c1c3c659bec8bbd2cbe36108108330f0db66cfe1e6b2a15c3628fab2759a')
    .then(response =>
     response.json())
    .then(boards =>
      this.boards = boards);
  }


}
