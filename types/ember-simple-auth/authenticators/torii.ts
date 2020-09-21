import EmberObject from '@ember/object';

export default class ToriiAuthenticator extends EmberObject {
  restore(data: any): Promise<any>;
}
