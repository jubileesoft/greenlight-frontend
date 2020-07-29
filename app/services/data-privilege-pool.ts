import Service from '@ember/service';
import { action } from '@ember/object';
import { PrivilegePool } from 'greenlight-frontend/gql/types';

export default class DataPrivilegePool extends Service.extend({
  // anything which *must* be merged to prototype here
}) {
  @action
  async orderUp(privilegePool: PrivilegePool) {
    //
  }

  @action
  async orderDown(privilegePool: PrivilegePool) {
    //
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'data-privilege-pool': DataPrivilegePool;
  }
}
