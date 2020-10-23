import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import GlobalService from 'greenlight-frontend/services/global';
import Type from 'ember__routing';
import { Tenant } from 'greenlight-frontend/gql/types';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedTenantsId extends Controller.extend({
  // anything which *must* be merged to prototype here
}) {
  @service global!: GlobalService;
  @service router!: Type.Router;

  @tracked
  isSwitchTenantModalOpen: boolean = false;

  @tracked
  actionsIsOpen: boolean = false;

  @action
  createNewTenant() {
    this.router.transitionTo('authenticated.tenants.new');
  }

  @action
  switchTenant() {
    this.actionsIsOpen = false;
    this.isSwitchTenantModalOpen = true;
  }

  @action
  switchToTenant(tenant: Tenant) {
    this.isSwitchTenantModalOpen = false;
    this.router.transitionTo('authenticated.tenants.id', tenant.id);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'authenticated/tenants/id': AuthenticatedTenantsId;
  }
}
