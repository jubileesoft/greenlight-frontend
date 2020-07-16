import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Type from 'ember__routing';

export default class ProtectedAdminUsers extends Controller.extend({
  // anything which *must* be merged to prototype here
}) {
  @service router!: Type.Router;

  @action
  newUser() {
    this.router.transitionTo('protected.admin-users.new');
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'protected/admin-users': ProtectedAdminUsers;
  }
}
