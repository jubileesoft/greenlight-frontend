import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class Login extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  @service session;

  beforeModel(transition) {
    this.session.prohibitAuthentication('protected');
  }
}
