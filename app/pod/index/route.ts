import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import SessionService from 'ember-simple-auth/services/session';
import Transition from '@ember/routing/-private/transition';

export default class Index extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  @service session!: SessionService;

  beforeModel(transition: Transition) {
    this.session.requireAuthentication(transition, 'login');
    this.transitionTo('authenticated');
  }
}
