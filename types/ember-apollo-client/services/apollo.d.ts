import Service from '@ember/service';
import { MutationOptions, QueryOptions } from 'apollo-client';

export default class Apollo extends Service {
  public mutate<T = object>(
    options: MutationOptions,
    resultKey?: string,
  ): Promise<T>;

  public query<T = object>(opts: QueryOptions, resultKey?: string): Promise<T>;
}
