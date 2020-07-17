import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import CreateApiKey1Mutation from 'greenlight-frontend/gql/apps/create-app-api-key-1.graphql';
import GetAppQuery from 'greenlight-frontend/gql/apps/get-app.graphql';

export default class ProtectedAppManageApi extends Controller.extend({
  // anything which *must* be merged to prototype here
}) {
  @service apollo!: any;

  @tracked apiKey1: string | null = null;

  @action
  async createApiKey1() {
    const variables = {
      appId: this.model.app.id,
    };

    try {
      this.apiKey1 = await this.apollo.mutate(
        {
          mutation: CreateApiKey1Mutation,
          variables,
        },
        'createAppApiKey1',
      );

      this.apollo.query(
        {
          query: GetAppQuery,
          variables: { id: this.model.app.id },
          fetchPolicy: 'network-only',
        },
        'getApp',
      );
    } catch (error) {
      console.log(error);
    }
  }

  @action
  closeModal() {
    this.apiKey1 = null;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'protected/app/manage/api': ProtectedAppManageApi;
  }
}
