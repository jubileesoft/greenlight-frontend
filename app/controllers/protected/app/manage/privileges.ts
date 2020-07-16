import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
//import { A } from '@ember/array';
import addPrivilegeMutation from 'greenlight-frontend/gql/privileges/add-privilege.graphql';
import { AddPrivilegeInput } from 'greenlight-frontend/gql/types';
//import Ember from 'ember';
import Recorder, { RecordType } from 'greenlight-frontend/services/recorder';
import DataPrivilege from 'greenlight-frontend/services/data-privilege';
import getPrivilegesQuery from 'greenlight-frontend/gql/privileges/get-privileges.graphql';

export default class ProtectedAppManagePrivileges extends Controller.extend({
  // anything which *must* be merged to prototype here
}) {
  @service apollo!: any;
  @service recorder!: Recorder;
  @service dataPrivilege!: DataPrivilege;

  @tracked privilegeName: string | null = null;
  @tracked privilegeShort: string | null = null;
  //@tracked privilegeTags: Ember.NativeArray<string> = A();
  @tracked selectedTags: string[] = [];

  @action
  tagsOnChange(newTags: string[]) {
    this.selectedTags = newTags;
  }

  @action
  async addPrivilege(appId: string) {
    const input: AddPrivilegeInput = {
      name: this.privilegeName,
      short: this.privilegeShort ?? undefined,
      tags:
        this.selectedTags && this.selectedTags.length > 0
          ? this.selectedTags
          : undefined,
    };

    const variables = {
      appId,
      input,
    };

    try {
      await this.apollo.mutate(
        {
          mutation: addPrivilegeMutation,
          variables,
          update: (store: any, { data: { addPrivilege } }) => {
            let variables = {
              appId,
            };
            const data = store.readQuery({
              query: getPrivilegesQuery,
              variables,
            });
            data.getPrivileges.push(addPrivilege);
            store.writeQuery({ query: getPrivilegesQuery, data, variables });
          },
        },
        'addPrivilege',
      );

      this.recorder.addRecord(RecordType.INFO, 'Privilege created.');
      this.selectedTags = [];
      this.privilegeName = null;
      this.privilegeShort = null;
    } catch (response) {
      console.log(response.errors);
      const text = response.errors[0].name + ': ' + response.errors[0].message;

      this.recorder.addRecord(RecordType.ERROR, text);
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'protected/app/manage/privileges': ProtectedAppManagePrivileges;
  }
}
