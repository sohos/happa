'use strict';

var request = require('superagent-bluebird-promise');
var helpers = require('./helpers');

//
// Passage
// -------
// A client for Passage.
// config: {
//  endpoint: 'http://passage.com',
//  timeout_ms: 10000 # When a request should time out
// }
//
// Example Usage:
// var passage = new Passage({endpoint: 'http://localhost:5000'})
//
var Passage = function(config) {
  var constraints = {
    endpoint: {
      presence: true,
      url: {
        allowLocal: true,
      },
    },
  };

  helpers.validateOrRaise(config, constraints);

  if (config.timeout_ms === undefined) {
    config.timeout_ms = 10000;
  }

  return {
    //
    // checkInvite
    // -----------
    // Check if a invitation token is valid
    // params: {token: 'abcdef'}
    //
    checkInvite: function(params) {
      var constraints = {
        token: { presence: true },
      };

      var url = `${config.endpoint}/invite/${params.token}`;

      var promise = new Promise(resolve => {
        helpers.validateOrRaise(params, constraints);
        resolve(request.get(url).timeout(config.timeout_ms));
      }).then(x => {
        if (x.body.is_valid) {
          return x.body;
        } else {
          throw Error('InvalidToken');
        }
      });

      return promise;
    },

    //
    // createAccount
    // -----------
    // Create an account
    // params: {inviteToken: 'abcdef', password: 'uvwxyz'}
    //
    createAccount: function(params) {
      var constraints = {
        inviteToken: { presence: true },
        password: { presence: true },
      };

      var url = `${config.endpoint}/accounts/`;

      // Passage is not expecting camelcase in its json body
      // Converting it here.
      var payload = {
        invite_token: params.inviteToken,
        password: params.password,
      };

      var promise = new Promise(resolve => {
        helpers.validateOrRaise(params, constraints);
        resolve(
          request
            .post(url)
            .timeout(config.timeout_ms)
            .send(payload)
            .set('ContentType', 'application/json')
        );
      }).then(x => {
        return x.body;
      });

      return promise;
    },

    //
    // requestPasswordRecoveryToken
    // -----------
    // Request a password recovery token, which passage will send to the user's email.
    // params: {email: 'some_valid_email@example.com'}
    //
    requestPasswordRecoveryToken: function(params) {
      var constraints = {
        email: { presence: true, email: true },
      };

      var url = `${config.endpoint}/recovery/`;

      var payload = {
        email: params.email,
      };

      var promise = new Promise(resolve => {
        helpers.validateOrRaise(params, constraints);
        resolve(
          request
            .post(url)
            .timeout(config.timeout_ms)
            .send(payload)
            .set('ContentType', 'application/json')
        );
      }).then(x => {
        return x.body;
      });

      return promise;
    },

    //
    // verifyPasswordRecoveryToken
    // -----------
    // Verify a password recovery token. Promise only resolves if the token is valid.
    // If the token is invalid, or the request fails for some reason the promise is
    // rejected.
    //
    // params: {email: 'some_valid_email@example.com', token: '123456abcdefg'}
    //
    verifyPasswordRecoveryToken: function(params) {
      var constraints = {
        email: { presence: true, email: true },
        token: { presence: true },
      };

      var url = `${config.endpoint}/recovery/${params.token}/`;

      var payload = {
        email: params.email,
      };

      var promise = new Promise(resolve => {
        helpers.validateOrRaise(params, constraints);
        resolve(
          request
            .post(url)
            .timeout(config.timeout_ms)
            .send(payload)
            .set('ContentType', 'application/json')
        );
      }).then(x => {
        if (x.body.is_valid) {
          return x.body;
        } else {
          throw new Error('Invalid Token');
        }
      });

      return promise;
    },

    //
    // setNewPassword
    // -----------
    // Set a new password. Requires a valid recovery token.
    // If the token is invalid, or the request fails for some reason the promise is
    // rejected.
    //
    // params: {email: 'some_valid_email@example.com', token: '123456abcdefg', password: 'users_new_password'}
    //
    setNewPassword: function(params) {
      var constraints = {
        email: { presence: true, email: true },
        token: { presence: true },
        password: { presence: true },
      };

      var url = `${config.endpoint}/recovery/${params.token}/password/`;

      var payload = {
        email: params.email,
        password: params.password,
      };

      var promise = new Promise(resolve => {
        helpers.validateOrRaise(params, constraints);
        resolve(
          request
            .post(url)
            .timeout(config.timeout_ms)
            .send(payload)
            .set('ContentType', 'application/json')
        );
      }).then(x => {
        return x.body;
      });

      return promise;
    },

    //
    // getInvitations
    // ----------
    // Gets all the invitations on a given installation.
    // Requires a valid admin JWT token.
    //
    getInvitations: function(authToken) {
      var url = `${config.endpoint}/invites/`;

      var promise = new Promise(resolve => {
        resolve(
          request
            .get(url)
            .timeout(config.timeout_ms)
            .set('ContentType', 'application/json')
            .set('Authorization', 'Bearer ' + authToken)
        );
      }).then(x => {
        return x.body;
      });

      return promise;
    },

    //
    // createInvitation
    // ----------
    // Creates an invitation. Even though passage can take multiple organizations
    // this function is only set up to recieve one.
    // Requires a valid admin JWT token.
    //
    // invitation should be an object like:
    // {
    //   email: "invitee@example.com",
    //   organization: "orgtojoin",
    //   sendEmail: true
    // }
    //
    createInvitation: function(authToken, invitation) {
      var url = `${config.endpoint}/invite/`;

      var constraints = {
        email: { presence: true, email: true },
        organization: { presence: { allowEmpty: false } },
        sendEmail: { presence: true },
      };

      var payload = {
        email: invitation.email,
        organizations: [invitation.organization],
        send_email: invitation.sendEmail,
      };

      var promise = new Promise(resolve => {
        helpers.validateOrRaise(invitation, constraints);
        resolve(
          request
            .post(url)
            .timeout(config.timeout_ms)
            .send(payload)
            .set('ContentType', 'application/json')
            .set('Authorization', 'Bearer ' + authToken)
        );
      }).then(x => {
        return x.body;
      });

      return promise;
    },
  };
};

export default Passage;
