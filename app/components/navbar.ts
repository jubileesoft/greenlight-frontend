import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Persistence from 'greenlight-frontend/services/persistence';

interface NavbarArgs {}

export default class Navbar extends Component<NavbarArgs> {
  @service persistence!: Persistence;

  @action
  toggleIsExpanded() {
    this.persistence.setNavbarIsExpanded(!this.persistence.navbarIsExpanded);
  }
}
