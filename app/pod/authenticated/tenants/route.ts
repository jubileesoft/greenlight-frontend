import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { AuthenticatedRouteModel } from 'greenlight-frontend/pod/authenticated/route';
import { UserRoleType, Tenant } from 'greenlight-frontend/gql/types';
import getTenantsQuery from 'greenlight-frontend/gql/tenants/get-tenants.graphql';
import ApolloService from 'ember-apollo-client/services/apollo';

export interface AuthenticatedTenantsModel {
  tenants: Tenant[] | null;
}

export default class AuthenticatedTenants extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  @service apollo!: ApolloService;

  beforeModel() {
    const authenticatedRouteModel = this.modelFor(
      'authenticated',
    ) as AuthenticatedRouteModel | null;

    if (!authenticatedRouteModel) {
      this.transitionTo('authenticated.unauthorized');
      return;
    }

    // Only allow access to tenants route for ADMIN or TENANT_ADMIN
    if (
      !authenticatedRouteModel.user.roles.find(
        (x) =>
          x.type === UserRoleType.ADMIN || x.type === UserRoleType.TENANT_ADMIN,
      )
    ) {
      this.transitionTo('authenticated.index');
      return;
    }
  }

  async model(): Promise<AuthenticatedTenantsModel> {
    const tenants = (await this.apollo.query(
      { query: getTenantsQuery },
      'getTenants',
    )) as Tenant[] | null;

    if (!tenants) {
      this.transitionTo('authenticated.tenants.index');
      return {
        tenants: null,
      };
    }

    return {
      tenants,
    };
  }
}
