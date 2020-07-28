import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import {
  AddPrivilegePoolInput,
  Privilege,
} from 'greenlight-frontend/gql/types';
import addPrivilegePoolMutation from 'greenlight-frontend/gql/privilege-pools/add-privilege-pool.graphql';
import getPrivilegePoolsQuery from 'greenlight-frontend/gql/privilege-pools/get-privilege-pools.graphql';
import Ember from 'ember';

export default class ProtectedAppManagePrivilegePoolsNew extends Controller.extend(
  {
    // anything which *must* be merged to prototype here
  },
) {
  @service apollo!: any;

  @tracked name: string | null = null;
  @tracked short: string | null = null;
  @tracked selectedTags: string[] = [];
  @tracked selectedIndexes: Ember.NativeArray<number> = A();

  get canAdd() {
    return this.name && this.selectedIndexes.length > 0;
  }

  @action
  resetForm() {
    this.name = null;
    this.short = null;
    this.selectedIndexes = A();
  }

  @action
  async addPrivilegePool(appId: string) {
    if (!this.name) {
      return;
    }

    const privilegeIds: string[] = [];
    this.selectedIndexes.forEach((index) => {
      const privilege: Privilege = this.model.privileges[index];
      privilegeIds.push(privilege.id);
    });

    const input: AddPrivilegePoolInput = {
      name: this.name,
      short: this.short ?? undefined,
      tags:
        this.selectedTags && this.selectedTags.length > 0
          ? this.selectedTags
          : undefined,
      privilegeIds,
    };

    const variables = {
      appId,
      input,
    };

    try {
      await this.apollo.mutate(
        {
          mutation: addPrivilegePoolMutation,
          variables,
          update: (store: any, { data: { addPrivilegePool } }) => {
            let variables = {
              appId,
            };
            const data = store.readQuery({
              query: getPrivilegePoolsQuery,
              variables,
            });
            data.getPrivilegePools.push(addPrivilegePool);
            store.writeQuery({
              query: getPrivilegePoolsQuery,
              data,
              variables,
            });
          },
        },
        'addPrivilegePool',
      );
    } catch (error) {}
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'protected/app/manage/privilege-pools/new': ProtectedAppManagePrivilegePoolsNew;
  }
}
