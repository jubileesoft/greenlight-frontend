import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedTenantsNew extends Controller.extend({
  // anything which *must* be merged to prototype here
}) {
  @tracked nameStatus = 'error';

  get headerElement() {
    return document.getElementById('header-content');
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'authenticated/tenants/new': AuthenticatedTenantsNew;
  }
}
