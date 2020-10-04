import Route from '@ember/routing/route';

interface RouteParams {
  tenant_id: string;
}

export default class AuthenticatedTenantsId extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  model(params: RouteParams) {
    return null;
  }
}
