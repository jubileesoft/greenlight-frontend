import Route from '@ember/routing/route';

interface Params {
  user_id: string;
}

export default class ProtectedAdminUsersId extends Route.extend({
  // anything which *must* be merged to prototype here
}) {
  model(params: Params) {
    console.log(params.user_id);
    return null;
  }
}
