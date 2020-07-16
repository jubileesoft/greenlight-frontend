import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';

export default class ProtectedAdminUsersNew extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  @queryManager apollo;
}
