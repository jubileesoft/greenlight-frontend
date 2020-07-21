import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Persistence from 'greenlight-frontend/services/persistence';
import { App } from 'greenlight-frontend/gql/types';
import Type from 'ember__routing';

interface NavbarArgs {
  apps: App[];
}

export default class Navbar extends Component<NavbarArgs> {
  @service persistence!: Persistence;
  @service router!: Type.Router;

  get selectedApp(): App | null {
    if (!this.persistence.selectedAppId) {
      return null;
    }

    return (
      this.args.apps.find((x) => x.id === this.persistence.selectedAppId) ??
      null
    );
  }

  set selectedApp(app: App | null) {
    this.persistence.setSelectedAppId(app ? app.id : null);
  }

  @action
  toggleIsExpanded() {
    this.persistence.setNavbarIsExpanded(!this.persistence.navbarIsExpanded);
  }

  @action
  selectedAppChanged(app: App) {
    this.selectedApp = app;
    const currentRoute = this.router.currentRouteName;
    this.router.transitionTo(currentRoute, app.id);
  }
}
