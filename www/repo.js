import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
 
@inject(HttpClient)
export class Repo {
	constructor()	{
		this.http = new HttpClient;
	    this.http.configure(config => {
	      config
	        .useStandardConfiguration()
	        .withBaseUrl('https://api.github.com/');
	    });
	}

	async activate(params) {
      let repo = await this.http.fetch('repositories/' + params.repoId)
  	    .then(response => response.json())
  	    .then(repo => this.repo = repo);

      let assignees = await this.http.fetch('repositories/' + params.repoId + '/contributors')
  	    .then(response => response.json())
  	    .then(assignees => this.assignees = assignees);

      let branches = await this.http.fetch('repositories/' + params.repoId + '/branches')
        .then(response => response.json())
        .then(branches => this.branches = branches);

      var count = 0;
      for (var branch in branches)  {

        branches[count].commit.details = await fetch(branches[count].commit.url).then(response => response.json());
        var dateObj = new Date(branches[count].commit.details.commit.committer.date);
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        branches[count].commit.details.commit.committer.date = year + "/" + month + "/" + day;
        console.log(branches[count].commit);
        count++;
      }
    
        
	    var trello = new Trello;
    	trello.getBoards(params).then(board => this.board = board);
    	// trello.getCards(params).then(card => this.cards = card);
     //  trello.getLists(params).then(list => this.lists = list);
      let cards = await trello.getCards(params);
      let lists = await trello.getLists(params);
      this.cardArray = [];
      var listArray = [];
      this.cardArray = cards;
      listArray = lists;
      var count = 0;
      for (var card in cards) {
        for (var list in lists) {
          if (this.cardArray[card].idList == listArray[list].id) {
              this.cardArray[card]['listName'] = listArray[list].name;
          };
        }
        count++;
      }
      console.log(this.cardArray[89].labels);
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

  getBoards(params) {
    this.boards = this.http.fetch('boards/' + params.boardId + '?key=8c37986e472cbf396b4cbde902b1d877&token=b331c1c3c659bec8bbd2cbe36108108330f0db66cfe1e6b2a15c3628fab2759a')
    .then(response =>
     response.json());
    return this.boards;
    
  }
  getCards(params)	{
  	return this.http.fetch('boards/' + params.boardId + '/cards?key=8c37986e472cbf396b4cbde902b1d877&token=b331c1c3c659bec8bbd2cbe36108108330f0db66cfe1e6b2a15c3628fab2759a')
    .then(response =>
     response.json())
    .then(cards => 
      this.cards = cards);    
  }
  getLists(params)  {
    return this.http.fetch('boards/' + params.boardId + '/lists?key=8c37986e472cbf396b4cbde902b1d877&token=b331c1c3c659bec8bbd2cbe36108108330f0db66cfe1e6b2a15c3628fab2759a')
    .then(response =>
     response.json())
    .then(list => 
      this.list = list);
  }
}