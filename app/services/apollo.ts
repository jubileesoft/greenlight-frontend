import ApolloService from 'ember-apollo-client/services/apollo';

export interface ApolloErrorResult {
  errors: ApolloError[];
}

export interface ApolloError {
  code: string;
  message: string;
}

export default class Apollo extends ApolloService.extend({
  // anything which *must* be merged to prototype here
}) {
  errorResultToString(result: ApolloErrorResult): string {
    let errorText: string[] = [];
    result.errors.forEach((error) => {
      errorText.push(error.code + ': ' + error.message);
    });
    return errorText.join(' / ');
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    apollo: Apollo;
  }
}
