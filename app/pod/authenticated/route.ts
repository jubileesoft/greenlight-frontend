import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Transition from '@ember/routing/-private/transition';
import { queryManager } from 'ember-apollo-client';
import ApolloService from 'greenlight-frontend/services/apollo';
import SessionService from 'ember-simple-auth/services/session';
import getMeQuery from 'greenlight-frontend/gql/users/get-me.graphql';
import { User, UserRoleType } from 'greenlight-frontend/gql/types';
import UserService from 'greenlight-frontend/services/user';

export interface AuthenticatedRouteModel {
  user: User;
}

export default class Authenticated extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  @queryManager apollo!: ApolloService;
  @service session!: SessionService;
  @service user!: UserService;

  beforeModel(transition: Transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  async model(): Promise<AuthenticatedRouteModel | null> {
    // Query the "me"-endpoint. This will determine whether
    // the authenticated user is also authorized.

    const user = (await this.apollo.query(
      {
        query: getMeQuery,
      },
      'getMe',
    )) as User | null;

    if (!user) {
      this.transitionTo('authenticated.unauthorized');
      return null;
    }

    if (
      !user.roles.find(
        (x) =>
          x.type === UserRoleType.ADMIN ||
          x.type === UserRoleType.TENANT_ADMIN ||
          x.type === UserRoleType.APP_ADMIN,
      )
    ) {
      this.transitionTo('authenticated.unauthorized');
      return null;
    }

    return {
      user,
    };
  }
}
