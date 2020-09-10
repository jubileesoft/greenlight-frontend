import Route from '@ember/routing/route';
import { AuthenticatedRouteModel } from 'greenlight-frontend/pod/authenticated/route';
import { UserRoleType } from 'greenlight-frontend/gql/types';

export default class AuthenticatedTenants extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
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
}
