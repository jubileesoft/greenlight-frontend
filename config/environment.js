'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'greenlight-frontend',
    podModulePrefix: 'greenlight-frontend/pod',
    environment,
    rootURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    apollo: {
      apiURL: process.env.API_URI + '/graphql',
    },

    torii: {
      routeIfAlreadyAuthenticated: 'protected',
      providers: {
        'google-oauth2-bearer-v2': {
          apiKey: process.env.GOOGLE_API_KEY,
          redirectUri: process.env.GOOGLE_REDIRECT_URI,
          scope: 'openid email profile',
        },
        'microsoft-oauth2': {
          clientId: process.env.MICROSOFT_CLIENT_ID,
          tenantId: process.env.MICROSOFT_TENANT_ID,
          scope: 'openid email profile',
        },
      },
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV['ember-apollo-client'] = {
      connectToDevTools: true,
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
