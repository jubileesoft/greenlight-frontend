import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { AuthenticatedTenantsModel } from 'greenlight-frontend/pod/authenticated/tenants/route';
import PersistenceService from 'greenlight-frontend/services/persistence';

export default class AuthenticatedTenantsIndex extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  @service persistence!: PersistenceService;
  model() {
    const authenticatedTenantsModel = this.modelFor(
      'authenticated.tenants',
    ) as AuthenticatedTenantsModel;
    if (
      authenticatedTenantsModel.tenants != null &&
      authenticatedTenantsModel.tenants.length > 0
    ) {
      // There are tenants available. Determine which one to chosse.
      // Set default to "first of loaded tenents".
      let tenantId = authenticatedTenantsModel.tenants[0].id;

      if (
        this.persistence.selectedTenanatId &&
        authenticatedTenantsModel.tenants.find((tenant) => {
          return tenant.id === this.persistence.selectedTenanatId;
        })
      ) {
        tenantId = this.persistence.selectedTenanatId;
      } else {
        this.persistence.setSelectedTenantId(tenantId);
      }

      this.transitionTo('authenticated.tenants.id', tenantId);
      return;
    }

    // There is no tenant available.
    this.transitionTo('authenticated.tenants.new');
  }
}
