import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class Login extends Controller.extend({
  // anything which *must* be merged to prototype here
}) {
  @service session;

  @action
  async loginWithGoogle() {
    console.log('LOGIN WITH GOOGLE');
    try {
      await this.session.authenticate(
        'authenticator:torii-google',
        'google-oauth2-bearer-v2',
      );
    } catch (error) {
      // TODO
    }
  }

  @action
  async loginWithMicrosoft() {
    console.log('LOGIN WITH MICROSOFT');
    try {
      await this.session.authenticate(
        'authenticator:torii-microsoft',
        'microsoft-oauth2',
      );
    } catch (error) {
      console.log(error);
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    login: Login;
  }
}
