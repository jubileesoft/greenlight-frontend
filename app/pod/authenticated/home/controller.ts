import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class AuthenticatedHome extends Controller.extend({
  // anything which *must* be merged to prototype here
}) {
  @action
  goToTenants() {
    this.transitionToRoute('authenticated.tenants');
  }

  @action
  goToApps() {
    this.transitionToRoute('authenticated.apps');
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'authenticated/home': AuthenticatedHome;
  }
}
