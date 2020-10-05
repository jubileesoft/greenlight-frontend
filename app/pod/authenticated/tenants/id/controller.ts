import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import GlobalService from 'greenlight-frontend/services/global';
import Type from 'ember__routing';

export default class AuthenticatedTenantsId extends Controller.extend({
  // anything which *must* be merged to prototype here
}) {
  @service global!: GlobalService;
  @service router!: Type.Router;

  @action
  createNewTenant() {
    this.router.transitionTo('authenticated.tenants.new');
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'authenticated/tenants/id': AuthenticatedTenantsId;
  }
}
