import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';
import { inject as service } from '@ember/service';

export default ToriiAuthenticator.extend({
  // #region Services

  torii: service(),

  // #endregion Services

  // #region Fields

  _providers: null,

  // #endregion Fields

  // #region Hooks

  init() {
    this._super(...arguments);
    this._providers = [];
  },

  // #endregion Hooks

  // #region Methods

  // This method is (automatically) called when a persisted token in the LocalStorage is restored.
  restore(data) {
    return new Promise((resolve, reject) => {
      this._assertToriiIsPresent();

      data = data || {};
      if (!data.authorizationToken) {
        reject();
        return;
      }

      // Check if token has expired or is otherwise "broken"
      if (this._isTokenValid(data.authorizationToken)) {
        if (this._providers.indexOf(data.provider === -1)) {
          this._providers.push(data.provider);
        }
        //this.azure.printTokenInfo(data.authorizationToken);
        //this.azure._triggerTokenRefreshMechanisms(data.authorizationToken);
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate(provider, options) {
    this._assertToriiIsPresent();
    /* eslint-disable no-async-promise-executor */
    return new Promise(async (resolve, reject) => {
      try {
        let data = await this.torii.open(provider, options || {});
        data.provider = provider;
        if (this._providers.indexOf(provider === -1)) {
          this._providers.push(provider);
        }
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  },

  /** This method invalidates the token and stops the refresh mechanisms */
  invalidate(data) {
    /* eslint-disable no-async-promise-executor */
    return new Promise(async (resolve, reject) => {
      this.azure._stopRunningTokenRefreshMechanisms();
      try {
        let providers = Array.from(this._providers); // make a shallow copy
        for (let i = 0; i < providers.length; i++) {
          await this.torii.close(providers[i], data);

          // delete provider from array
          this._providers.splice(this._providers.indexOf(providers[i], 1));
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },

  // #endregion Methods

  // #region Private Methods

  _isTokenValid(authorizationToken) {
    let idToken = authorizationToken
      ? authorizationToken.id_token
      : this.session.data.authenticated.authorizationToken.id_token;

    if (idToken === undefined) {
      return null;
    }

    let token = this._extractIdToken(idToken);

    // Check if the token has already expired
    let exp = token.exp;
    let expDate = this._getDate(exp);
    if (Date.now() > expDate.getTime()) {
      return false;
    }

    return true;
  },

  // #endregion Private Methods

  // #region ADAL.JS Methods (from Microsoft)

  _extractIdToken(encodedIdToken) {
    var decodedToken = this._decodeJwt(encodedIdToken);
    if (!decodedToken) {
      return null;
    }

    try {
      var base64IdToken = decodedToken.JWSPayload;
      var base64Decoded = this._base64DecodeStringUrlSafe(base64IdToken);
      if (!base64Decoded) {
        this._logger.warn(
          'The returned id_token could not be base64 url safe decoded.',
        );
        return null;
      }

      // ECMA script has JSON built-in support
      return JSON.parse(base64Decoded);
    } catch (err) {
      this._logger.error('The returned id_token could not be decoded', err);
    }

    return null;
  },

  _decodeJwt(jwtToken) {
    if (this._isEmpty(jwtToken)) {
      return null;
    }

    var idTokenPartsRegex = /^([^.\s]*)\.([^.\s]+)\.([^.\s]*)$/;

    var matches = idTokenPartsRegex.exec(jwtToken);
    if (!matches || matches.length < 4) {
      this._logger.warn('The returned id_token is not parsable.');
      return null;
    }

    var crackedToken = {
      header: matches[1],
      JWSPayload: matches[2],
      JWSSig: matches[3],
    };

    return crackedToken;
  },

  _isEmpty(str) {
    return typeof str === 'undefined' || !str || 0 === str.length;
  },

  _base64DecodeStringUrlSafe(base64IdToken) {
    // html5 should support atob function for decoding
    base64IdToken = base64IdToken.replace(/-/g, '+').replace(/_/g, '/');
    if (window.atob) {
      return decodeURIComponent(escape(window.atob(base64IdToken))); // jshint ignore:line
    } else {
      return decodeURIComponent(escape(this._decode(base64IdToken)));
    }
  },

  _decode(base64IdToken) {
    var codes =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    base64IdToken = String(base64IdToken).replace(/=+$/, '');

    var length = base64IdToken.length;
    if (length % 4 === 1) {
      throw new Error('The token to be decoded is not correctly encoded.');
    }

    var h1,
      h2,
      h3,
      h4,
      bits,
      c1,
      c2,
      c3,
      decoded = '';
    for (var i = 0; i < length; i += 4) {
      //Every 4 base64 encoded character will be converted to 3 byte string, which is 24 bits
      // then 6 bits per base64 encoded character
      h1 = codes.indexOf(base64IdToken.charAt(i));
      h2 = codes.indexOf(base64IdToken.charAt(i + 1));
      h3 = codes.indexOf(base64IdToken.charAt(i + 2));
      h4 = codes.indexOf(base64IdToken.charAt(i + 3));

      // For padding, if last two are '='
      if (i + 2 === length - 1) {
        bits = (h1 << 18) | (h2 << 12) | (h3 << 6);
        c1 = (bits >> 16) & 255;
        c2 = (bits >> 8) & 255;
        decoded += String.fromCharCode(c1, c2);
        break;
      }
      // if last one is '='
      else if (i + 1 === length - 1) {
        bits = (h1 << 18) | (h2 << 12);
        c1 = (bits >> 16) & 255;
        decoded += String.fromCharCode(c1);
        break;
      }

      bits = (h1 << 18) | (h2 << 12) | (h3 << 6) | h4;

      // then convert to 3 byte chars
      c1 = (bits >> 16) & 255;
      c2 = (bits >> 8) & 255;
      c3 = bits & 255;

      decoded += String.fromCharCode(c1, c2, c3);
    }

    return decoded;
  },

  // #endregion ADAL.JS Methods (from Microsoft)
});
