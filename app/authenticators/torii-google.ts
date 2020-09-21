import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';
import { inject as service } from '@ember/service';
import ToriiService from 'torii/services/torii';
//import amsel, { GoogleConfig } from '@jubileesoft/amsel';

export default class GoogleAuthenticator extends ToriiAuthenticator {
  @service torii!: ToriiService;

  // This method is (automatically) called when a persisted token in the LocalStorage is restored.
  async restore(data: any): Promise<any> {
    //debugger;
    let restoredData = await super.restore(data);

    // if (restoredData) {
    //   // The restored token is NOT validated yet. It could be that
    //   // the token has already expired.

    //   const googleConfig: GoogleConfig = {
    //     appClientId: process.env.GOOGLE_API_KEY as string,
    //   };

    //   amsel.initializeGoogle(googleConfig);
    //   amsel.verifyAccessTokenFromGoogle(`Bearer ${restoredData.access_token}`);
    // }

    return restoredData;
  }
}
