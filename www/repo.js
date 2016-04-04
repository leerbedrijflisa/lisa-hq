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

        console.log(branches[count].commit.url);
        count++;
      }
    
        
	    var trello = new Trello;
    	trello.getBoards(params).then(board => this.board = board);
    	// trello.getCards(params).then(card => this.cards = card);
     //  trello.getLists(params).then(list => this.lists = list);
      var cards = trello.getCards(params);
      var lists = trello.getLists(params);
      var _this = this;
      Promise.all([cards, lists]).then(function([cardList, listList]) {
        _this.cardArray = [];
        var listArray = [];
        _this.cardArray = cardList;
        listArray = listList;
        var count = 0;
        for (var card in _this.cardArray) {
          for (var list in listArray) {
            if (_this.cardArray[card].idList == listArray[list].id) {
                _this.cardArray[card]['listName'] = listArray[list].name;
              };
            }
            count++;
          }
        }
      );
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