import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Type from 'ember__routing';

export default class Index extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  @service session;
  @service router!: Type.Router;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
    this.router.transitionTo('protected');
  }
}
