import Service from '@ember/service';
import { User } from 'greenlight-frontend/gql/types';

export default class UserService extends Service.extend({
  // anything which *must* be merged to prototype here
}) {
  public me: User | undefined;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    user: UserService;
  }
}
