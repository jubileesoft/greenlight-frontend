import Route from '@ember/routing/route';

export default class ProtectedAdminApps extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  model() {
    return this.modelFor('protected');
  }
}
