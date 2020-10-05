import Service from '@ember/service';

export default class Global extends Service.extend({
  // anything which *must* be merged to prototype here
}) {
  get headerElement() {
    return document.getElementById('header-content');
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    global: Global;
  }
}
