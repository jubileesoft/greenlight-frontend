import Oauth2 from 'torii/providers/oauth2-bearer';
import { computed } from '@ember/object';
import ENV from 'greenlight-frontend/config/environment';

var MicrosoftOauth2 = Oauth2.extend({
  // region Fields

  _endpoint: 'https://login.microsoftonline.com/',

  // endregion Fields

  // region Properties

  name: 'microsoft-oauth2',

  clientId: ENV.torii.providers['microsoft-oauth2'].clientId,

  tenantId: ENV.torii.providers['microsoft-oauth2'].tenantId,

  redirectUri: window.location.origin + '/torii/redirect.html',

  baseUrl: computed('_endpoint', 'tenantId', function () {
    let baseUrl = this._endpoint;

    baseUrl += 'common';

    // if (this.tenantId === undefined) {
    //   baseUrl += 'common/v2.0';
    // } else {
    //   baseUrl += this.tenantId;
    // }

    baseUrl += '/oauth2/v2.0/authorize';

    return baseUrl;
  }),

  // additional url params that this provider requires
  requiredUrlParams: null,

  responseParams: ['id_token', 'state'],

  state: 'STATE',
  nonce: '678910',

  scope: ENV.torii.providers['microsoft-oauth2'].scope,

  responseMode: 'fragment',

  responseType: 'id_token',

  // prompt: 'login',

  // endregion Properties

  // region Constructor

  init() {
    this._super(...arguments);
    this.set('requiredUrlParams', [
      'state',
      'client_id',
      'response_type',
      'response_mode',
      'nonce',
      'redirect_uri',
      /* 'prompt' */
    ]);
  },

  // endregion

  // region Methods

  fetch(data) {
    return data;
  },

  // endregion Methods
});

export default MicrosoftOauth2;
