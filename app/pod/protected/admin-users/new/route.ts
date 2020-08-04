import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import ApolloService from 'greenlight-frontend/services/apollo';

export default class ProtectedAdminUsersNew extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  @queryManager apollo!: ApolloService;
}
