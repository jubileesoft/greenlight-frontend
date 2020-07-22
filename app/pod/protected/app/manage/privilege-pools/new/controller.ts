import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class ProtectedAppManagePrivilegePoolsNew extends Controller.extend(
  {
    // anything which *must* be merged to prototype here
  },
) {
  @tracked selectedTags: string[] = [];
  selectedIndexes = A();
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'protected/app/manage/privilege-pools/new': ProtectedAppManagePrivilegePoolsNew;
  }
}
