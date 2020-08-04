import Service from '@ember/service';
import { MutationOptions } from 'apollo-client';

export default class Apollo extends Service {
  mutate<T = object>(options: MutationOptions, resultKey?: string): Promise<T>;
}
