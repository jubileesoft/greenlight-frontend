import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { queryManager } from 'ember-apollo-client';
import getPrivilegesQuery from 'greenlight-frontend/gql/privileges/get-privileges.graphql';
import { App, Privilege } from 'greenlight-frontend/gql/types';

interface Model {
  privileges: Privilege[];
  app: App;
}

export default class ProtectedAppManagePrivileges extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  @queryManager apollo: any;

  model(): Promise<Model> {
    const app = this.modelFor('protected.app') as App;

    const variables = {
      appId: app.id,
    };

    return RSVP.hash({
      privileges: this.apollo.watchQuery(
        {
          query: getPrivilegesQuery,
          variables,
          fetchPolicy: 'cache-and-network',
        },
        'getPrivileges',
      ),
      app,
    });
  }
}
