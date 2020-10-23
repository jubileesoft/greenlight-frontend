import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import ApolloService from 'greenlight-frontend/services/apollo';
import getTenantsQuery from 'greenlight-frontend/gql/tenants/get-tenants.graphql';
import { Tenant } from 'greenlight-frontend/gql/types';

interface RouteParams {
  tenant_id: string;
}

export interface AuthenticatedTenantsIdRouteModel {
  tenant: Tenant | undefined;
  tenants: Tenant[] | null;
}

export default class AuthenticatedTenantsId extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  @queryManager apollo!: ApolloService;

  async model(params: RouteParams): Promise<AuthenticatedTenantsIdRouteModel> {
    const tenants: Tenant[] | null = await this.apollo.query(
      { query: getTenantsQuery, fetchPolicy: 'cache-only' },
      'getTenants',
    );

    console.log(tenants);
    return {
      tenant: tenants?.find((x) => x.id === params.tenant_id),
      tenants: tenants,
    };
  }
}
