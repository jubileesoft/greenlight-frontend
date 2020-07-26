import Torii from 'ember-simple-auth/authenticators/torii';
import { inject as service } from '@ember/service';

export default class ToriiAuthenticator extends Torii {
  @service torii;
}
