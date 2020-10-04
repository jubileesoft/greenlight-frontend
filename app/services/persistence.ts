import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import string2Boolean from 'greenlight-frontend/utils/string-to-boolean';

const STORAGE = {
  SELECTED_TENANT_ID: 'selectedTenantId',
  SELECTEDAPPID: 'selectedAppId',
  NAVBARISEXPANDED: 'navbarIsExpanded',
};

export default class Persistence extends Service.extend({
  // anything which *must* be merged to prototype here
}) {
  @tracked counterSelectedTenantId: number = 0;

  get selectedTenanatId(): string | null {
    const ignore = this.counterSelectedTenantId;
    return localStorage.getItem(STORAGE.SELECTED_TENANT_ID);
  }

  setSelectedTenantId(id: string | null) {
    if (id) {
      localStorage.setItem(STORAGE.SELECTED_TENANT_ID, id);
    } else {
      localStorage.removeItem(STORAGE.SELECTED_TENANT_ID);
    }

    this.counterSelectedTenantId++;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    persistence: Persistence;
  }
}
