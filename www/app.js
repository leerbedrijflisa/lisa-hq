export class App {
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'home'],       name: 'home',       moduleId: 'users' },
      { route: 'users',            name: 'users',      moduleId: 'users' },

    ]);
  }
}