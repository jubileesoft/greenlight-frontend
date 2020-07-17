import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class ProtectedAppManageApi extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  model() {
    return RSVP.hash({
      app: this.modelFor('protected.app'),
    });
  }
}
