import Service from '@ember/service';
import { MutationOptions } from 'apollo-client';
import Transition from '@ember/routing/-private/transition';

export default class Session extends Service {
  public requireAuthentication(
    transition: Transition,
    routeOrCallback: string | (() => void),
  ): boolean;

  public authenticate(authenticator: string, ...args: any): Promise<void>;

  public prohibitAuthentication(
    routeOrCallback: string | (() => void),
  ): boolean;
}
