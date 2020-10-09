import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { User } from 'greenlight-frontend/gql/types';
import Type from 'ember__routing';

interface HeaderArgs {
  user: User;
}

export default class Header extends Component<HeaderArgs> {
  @service router!: Type.Router;

  @action
  goHome() {
    this.router.transitionTo('authenticated.home');
  }
}
