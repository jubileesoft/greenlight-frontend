import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import getPrivilegePoolsQuery from 'greenlight-frontend/gql/privilege-pools/get-privilege-pools.graphql';
import { App, PrivilegePool } from 'greenlight-frontend/gql/types';
import RSVP from 'rsvp';

interface Model {
  privilegePools: PrivilegePool[];
}

export default class ProtectedAppManagePrivilegePools extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  @queryManager apollo: any;

  model(): Promise<Model> {
    const app = this.modelFor('protected.app') as App;

    const variables = {
      appId: app.id,
    };

    return RSVP.hash({
      privilegePools: this.apollo.watchQuery(
        {
          query: getPrivilegePoolsQuery,
          variables,
          fetchPolicy: 'cache-and-network',
        },
        'getPrivilegePools',
      ),
    });
  }
}
