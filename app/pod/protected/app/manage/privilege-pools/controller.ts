import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Type from 'ember__routing';
import DataPrivilegePoolService from 'greenlight-frontend/services/data-privilege-pool';

export default class ProtectedAppManagePrivilegePools extends Controller.extend(
  {
    // anything which *must* be merged to prototype here
  },
) {
  @service router!: Type.Router;
  @service dataPrivilegePool!: DataPrivilegePoolService;

  @action
  newPrivilegePool() {
    this.router.transitionTo('protected.app.manage.privilege-pools.new');
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'protected/app/manage/privilege-pools': ProtectedAppManagePrivilegePools;
  }
}
