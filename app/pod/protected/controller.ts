import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import Recorder from 'greenlight-frontend/services/recorder';

export default class Protected extends Controller.extend({
  // anything which *must* be merged to prototype here
}) {
  @service recorder!: Recorder;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    protected: Protected;
  }
}
