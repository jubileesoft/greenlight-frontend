import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import getAppQuery from 'greenlight-frontend/gql/apps/get-app.graphql';

interface Params {
  app_id: string;
}

export default class ProtectedApp extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  @queryManager apollo: any;

  model(params: Params) {
    return this.apollo.watchQuery(
      { query: getAppQuery, variables: { id: params.app_id } },
      'getApp',
    );
  }
}
