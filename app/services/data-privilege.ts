import Service from '@ember/service';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { Privilege, UpdatePrivilegeInput } from 'greenlight-frontend/gql/types';
import getPrivilegesQuery from 'greenlight-frontend/gql/privileges/get-privileges.graphql';
import UpdatePrivilegeMutation from 'greenlight-frontend/gql/privileges/update-privilege.graphql';
import DeletePrivilegeMutation from 'greenlight-frontend/gql/privileges/delete-privilege.graphql';
import OrderUpPrivilegeMutation from 'greenlight-frontend/gql/privileges/order-up-privilege.graphql';
import OrderDownPrivilegeMutation from 'greenlight-frontend/gql/privileges/order-down-privilege.graphql';
import ApolloService from 'greenlight-frontend/services/apollo';
import Recorder, { RecordType } from 'greenlight-frontend/services/recorder';

export default class DataPrivilege extends Service.extend({
  // anything which *must* be merged to prototype here
}) {
  @service apollo!: ApolloService;
  @service recorder!: Recorder;

  @action
  async updateProperty(
    privilege: Privilege,
    propertyName: string,
    propertyValue: any,
  ) {
    if ((privilege as any)[propertyName] === propertyValue) {
      return;
    }

    const variables: { privilegeId: string; input: UpdatePrivilegeInput } = {
      privilegeId: privilege.id,
      input: {},
    };

    (variables.input as any)[propertyName] = propertyValue;

    try {
      await this.apollo.mutate(
        { mutation: UpdatePrivilegeMutation, variables },
        'updatePrivilege',
      );
    } catch (resultError) {
      const message = this.apollo.errorResultToString(resultError);
      this.recorder.addRecord(RecordType.ERROR, message);
      throw resultError;
    }
  }

  @action
  async delete(privilege: Privilege) {
    const variables = {
      privilegeId: privilege.id,
    };

    try {
      await this.apollo.mutate(
        {
          mutation: DeletePrivilegeMutation,
          variables,
          update: (store: any, { data: { deletePrivilege } }) => {
            const variables = {
              appId: privilege.app.id,
            };
            const data = store.readQuery({
              query: getPrivilegesQuery,
              variables,
            });

            const index = data.getPrivileges
              .map((x: Privilege) => x.id)
              .indexOf(privilege.id);

            data.getPrivileges.splice(index, 1);
            store.writeQuery({ query: getPrivilegesQuery, data, variables });
          },
        },
        'deletePrivilege',
      );
    } catch (resultError) {
      const message = this.apollo.errorResultToString(resultError);
      this.recorder.addRecord(RecordType.ERROR, message);
      throw resultError;
    }
  }

  @action
  async orderUp(privilege: Privilege) {
    const variables = {
      privilegeId: privilege.id,
    };

    try {
      await this.apollo.mutate(
        {
          mutation: OrderUpPrivilegeMutation,
          variables,
          update: (store: any, { data: { orderUpPrivilege } }) => {
            const variables = {
              appId: privilege.app.id,
            };
            const data: { getPrivileges: Privilege[] } = store.readQuery({
              query: getPrivilegesQuery,
              variables,
            });

            const orderedArray = data.getPrivileges.sort((a, b) => {
              if (a.order < b.order) {
                return -1;
              }
              if (a.order > b.order) {
                return 1;
              }
              return 0;
            });
            const newData = {
              getPrivileges: orderedArray,
            };

            store.writeQuery({ query: getPrivilegesQuery, newData, variables });
          },
        },
        'orderUpPrivilege',
      );
    } catch (resultError) {
      const message = this.apollo.errorResultToString(resultError);
      this.recorder.addRecord(RecordType.ERROR, message);
      throw resultError;
    }
  }

  @action
  async orderDown(privilege: Privilege) {
    const variables = {
      privilegeId: privilege.id,
    };

    try {
      await this.apollo.mutate(
        {
          mutation: OrderDownPrivilegeMutation,
          variables,
          update: (store: any, { data: { orderDownPrivilege } }) => {
            const variables = {
              appId: privilege.app.id,
            };
            const data: { getPrivileges: Privilege[] } = store.readQuery({
              query: getPrivilegesQuery,
              variables,
            });

            const orderedArray = data.getPrivileges.sort((a, b) => {
              if (a.order < b.order) {
                return -1;
              }
              if (a.order > b.order) {
                return 1;
              }
              return 0;
            });
            const newData = {
              getPrivileges: orderedArray,
            };

            store.writeQuery({ query: getPrivilegesQuery, newData, variables });
          },
        },
        'orderDownPrivilege',
      );
    } catch (resultError) {
      const message = this.apollo.errorResultToString(resultError);
      this.recorder.addRecord(RecordType.ERROR, message);
      throw resultError;
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'data-privilege': DataPrivilege;
  }
}
