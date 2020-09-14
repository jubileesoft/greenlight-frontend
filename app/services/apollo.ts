import ApolloService from 'ember-apollo-client/services/apollo';
import { inject as service } from '@ember/service';
import { setContext } from '@apollo/client/link/context';
import SessionService from 'ember-simple-auth/services/session';

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
  @service session!: SessionService;

  errorResultToString(result: ApolloErrorResult): string {
    let errorText: string[] = [];
    result.errors.forEach((error) => {
      errorText.push(error.code + ': ' + error.message);
    });
    return errorText.join(' / ');
  }

  link() {
    let httpLink = super.link();

    let authLink = setContext(async (request, context) => {
      return this._runAuthorize();
      // debugger;
      // console.log('HALLO');
      // if (this.session.isAuthenticated) {
      //   Object.assign(context.headers, {
      //     headers: {
      //       authorization: `Bearer ${this.session.data.authenticated.access_token}`,
      //     },
      //   });
      // }

      // return context;
    });

    return authLink.concat(httpLink);
  }

  _runAuthorize() {
    if (!this.session.isAuthenticated) {
      return {};
    }
    return new Promise((resolve) => {
      debugger;
      let headers = {
        authorization: '',
        xauthprovider: '',
      };

      let token = null;
      let provider = null;

      if (this.session.data.authenticated.provider.includes('google')) {
        token = this.session.data.authenticated.access_token;
        provider = 'google';
      } else {
        token = this.session.data.authenticated.authorizationToken.id_token;
        provider = 'microsoft';
      }

      headers.authorization = `Bearer ${token}`;
      headers.xauthprovider = provider;

      resolve({
        headers,
      });
    });
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    apollo: Apollo;
  }
}
