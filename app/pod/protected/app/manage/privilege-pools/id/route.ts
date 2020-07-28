import Route from '@ember/routing/route';
import { PrivilegePool } from 'greenlight-frontend/gql/types';
import { Model as SubModel } from '../route';

interface Params {
  privilege_pool_id: string;
}

interface Model {
  privilegePool: PrivilegePool | undefined;
}

export default class ProtectedAppManagePrivilegePoolsId extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  model(params: Params): Model {
    const subModel: SubModel = this.modelFor(
      'protected.app.manage.privilege-pools',
    ) as SubModel;

    return {
      privilegePool: subModel.privilegePools.find(
        (x) => x.id === params.privilege_pool_id,
      ),
    };
  }
}
