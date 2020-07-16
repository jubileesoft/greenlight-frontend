import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import string2Boolean from 'greenlight-frontend/utils/string-to-boolean';

const STORAGE = {
  SELECTEDAPPID: 'selectedAppId',
  NAVBARISEXPANDED: 'navbarIsExpanded',
};

export default class Persistence extends Service.extend({
  // anything which *must* be merged to prototype here
}) {
  @tracked navbarIsExpanded: boolean = true;
  @tracked selectedAppId: string | null = null;

  constructor() {
    super(...arguments);
    const lsSelectedAppId = localStorage.getItem(STORAGE.SELECTEDAPPID);
    if (lsSelectedAppId) {
      this.selectedAppId = lsSelectedAppId;
    }
    const lsNavbarIsExpanded = localStorage.getItem(STORAGE.NAVBARISEXPANDED);
    if (
      lsNavbarIsExpanded &&
      typeof string2Boolean(lsNavbarIsExpanded) === 'boolean'
    ) {
      this.navbarIsExpanded = string2Boolean(lsNavbarIsExpanded);
    }
  }

  setSelectedAppId(id: string) {
    localStorage.setItem(STORAGE.SELECTEDAPPID, id);
    this.selectedAppId = id;
  }

  setNavbarIsExpanded(expanded: boolean) {
    localStorage.setItem(STORAGE.NAVBARISEXPANDED, expanded.toString());
    this.navbarIsExpanded = expanded;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    persistence: Persistence;
  }
}
