import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import SessionService from 'ember-simple-auth/services/session';

export default class Login extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  @service session!: SessionService;

  beforeModel() {
    this.session.prohibitAuthentication('authenticated');
  }
}
