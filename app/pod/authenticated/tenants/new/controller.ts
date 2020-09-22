import Controller from '@ember/controller';

export default class AuthenticatedTenantsNew extends Controller.extend({
  // anything which *must* be merged to prototype here
}) {
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
