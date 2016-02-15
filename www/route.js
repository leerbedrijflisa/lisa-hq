
export class Router {
  configureRouter(config, router){
    config.title = 'Aurelia';
    config.map([
      { route: 'users',         name: 'users',    moduleId: './users',    nav: true, title:'Github Users' }
    ]);

    this.router = router;
  }
}