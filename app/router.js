import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('protected', function () {
    this.route('admin-apps', function () {
      this.route('id', { path: ':app_id' });
      this.route('new');
    });
    this.route('admin-system');
    this.route('app', { path: ':app_id' }, function () {
      this.route('user-claims');
      this.route('manage', function() {
        this.route('api');
        this.route('privileges');
        this.route('privilege-pools');
      });
    });
  });
});
