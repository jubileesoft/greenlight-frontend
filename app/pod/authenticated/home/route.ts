import Route from '@ember/routing/route';
import { User } from 'greenlight-frontend/gql/types';
import { AuthenticatedRouteModel } from '../route';

export default class AuthenticatedHome extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  model() {
    const me: User = (this.modelFor('authenticated') as AuthenticatedRouteModel)
      .user;

    return {
      me,
    };
  }
}
