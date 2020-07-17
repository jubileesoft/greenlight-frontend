import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import { inject as service } from '@ember/service';
import getAppsQuery from 'greenlight-frontend/gql/apps/get-apps.graphql';
import Persistence from 'greenlight-frontend/services/persistence';

export default class Protected extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  @service persistence!: Persistence;
  @queryManager apollo: any;

  async model() {
    const apps = await this.apollo.watchQuery(
      {
        query: getAppsQuery,
        variables: null,
        fetchPolicy: 'cache-and-network',
      },
      'getApps',
    );

    if (apps && apps.length > 0) {
      const selectedApp = apps.find(
        (app) => app.id === this.persistence.selectedAppId,
      );
      if (!selectedApp) {
        this.persistence.setSelectedAppId(apps[0].id);
      }
    }

    return {
      apps,
    };
  }
}
