import Service from '@ember/service';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { PrivilegePool } from 'greenlight-frontend/gql/types';
import ApolloService from 'greenlight-frontend/services/apollo';
import Recorder, { RecordType } from 'greenlight-frontend/services/recorder';
import OrderUpPrivilegePoolMutation from 'greenlight-frontend/gql/privilege-pools/order-up-privilege-pool.graphql';
import getPrivilegePoolsQuery from 'greenlight-frontend/gql/privilege-pools/get-privilege-pools.graphql';
import OrderDownPrivilegePoolMutation from 'greenlight-frontend/gql/privilege-pools/order-down-privilege-pool.graphql';

interface OrderUpPrivilegePoolMutationResponse {
  data: {
    orderUpPrivilegePool: PrivilegePool[] | null;
  };
}

interface OrderDownPrivilegePoolMutationResponse {
  data: {
    orderDownPrivilegePool: PrivilegePool[] | null;
  };
}

export default class DataPrivilegePool extends Service.extend({
  // anything which *must* be merged to prototype here
}) {
  @service apollo!: ApolloService;
  @service recorder!: Recorder;

  @action
  async orderUp(privilegePool: PrivilegePool) {
    const variables = {
      privilegePoolId: privilegePool.id,
    };

    try {
      await this.apollo.mutate(
        {
          mutation: OrderUpPrivilegePoolMutation,
          variables,
          update: (
            store: any,
            response: OrderUpPrivilegePoolMutationResponse,
          ) => {
            if (!response.data.orderUpPrivilegePool) {
              return;
            }

            const variables = {
              appId: privilegePool.app.id,
            };
            const dataRead: {
              getPrivilegePools: PrivilegePool[];
            } = store.readQuery({
              query: getPrivilegePoolsQuery,
              variables,
            });

            const orderedArray = dataRead.getPrivilegePools.sort((a, b) => {
              if (a.order < b.order) {
                return -1;
              }
              if (a.order > b.order) {
                return 1;
              }
              return 0;
            });
            const data = {
              getPrivilegePools: orderedArray,
            };

            store.writeQuery({
              query: getPrivilegePoolsQuery,
              data,
              variables,
            });
          },
        },
        'orderUpPrivilegePool',
      );
    } catch (resultError) {
      const message = this.apollo.errorResultToString(resultError);
      this.recorder.addRecord(RecordType.ERROR, message);
      throw resultError;
    }
  }

  @action
  async orderDown(privilegePool: PrivilegePool) {
    const variables = {
      privilegePoolId: privilegePool.id,
    };

    try {
      await this.apollo.mutate(
        {
          mutation: OrderDownPrivilegePoolMutation,
          variables,
          update: (
            store: any,
            response: OrderDownPrivilegePoolMutationResponse,
          ) => {
            if (!response.data.orderDownPrivilegePool) {
              return;
            }

            const variables = {
              appId: privilegePool.app.id,
            };
            const dataRead: {
              getPrivilegePools: PrivilegePool[];
            } = store.readQuery({
              query: getPrivilegePoolsQuery,
              variables,
            });

            const orderedArray = dataRead.getPrivilegePools.sort((a, b) => {
              if (a.order < b.order) {
                return -1;
              }
              if (a.order > b.order) {
                return 1;
              }
              return 0;
            });
            const data = {
              getPrivilegePools: orderedArray,
            };

            store.writeQuery({
              query: getPrivilegePoolsQuery,
              data,
              variables,
            });
          },
        },
        'orderDownPrivilegePool',
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
    'data-privilege-pool': DataPrivilegePool;
  }
}
