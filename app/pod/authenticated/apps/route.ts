import Route from '@ember/routing/route';
import { User } from 'greenlight-frontend/gql/types';
import { AuthenticatedRouteModel } from '../route';

export interface AuthenticatedAppsModel {
  apps: null;
  me: User;
}

export default class AuthenticatedApps extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  async model() {
    const me: User = (this.modelFor('authenticated') as AuthenticatedRouteModel)
      .user;

    return {
      apps: null,
      me,
    };
  }
}
