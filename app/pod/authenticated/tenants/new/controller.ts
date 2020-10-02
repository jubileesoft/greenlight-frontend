import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import ApolloService from 'ember-apollo-client/services/apollo';
import isTenantNameTakenQuery from 'greenlight-frontend/gql/tenants/is-tenant-name-taken.graphql';

const NAME_STATUS = {
  ERROR: 'error',
  BUSY: 'busy',
  OK: 'ok',
  IDLE: 'idle',
};

const SAVE_STATUS = {
  IDLE: '',
  SAVING: 'saving',
  FAILED: 'failed',
};

export default class AuthenticatedTenantsNew extends Controller.extend({
  // anything which *must* be merged to prototype here
}) {
  @service apollo!: ApolloService;

  @tracked tenantName: string | null = null;
  @tracked isTenantNameValid: boolean = true;
  @tracked nameStatus = NAME_STATUS.IDLE;
  @tracked adminEmails: string | null = null;
  @tracked isAdminEmailsValid: boolean = true;
  @tracked saveStatus = SAVE_STATUS.IDLE;

  get headerElement() {
    return document.getElementById('header-content');
  }

  // get canCreate() {
  //   return (
  //     this.nameStatus === NAME_STATUS.OK &&
  //     this.isAdminEmailsOk(this.adminEmails)
  //   );
  // }

  @action
  async tenantNameOnChange(name: string) {
    this.tenantName = name;
    this.isTenantNameValid = true;

    // Only check online when "there is more than whitespaces"
    if (name.trim().length === 0) {
      this.nameStatus = NAME_STATUS.IDLE;
      return;
    }

    this.nameStatus = NAME_STATUS.BUSY;

    try {
      const variables = {
        name,
      };

      const isTaken: boolean = await this.apollo.query(
        {
          query: isTenantNameTakenQuery,
          variables,
        },
        'isTenantNameTaken',
      );
      if (isTaken) {
        this.nameStatus = NAME_STATUS.ERROR;
      } else {
        this.nameStatus = NAME_STATUS.OK;
      }
    } catch (error) {
      this.nameStatus = NAME_STATUS.ERROR;
    }
  }

  @action
  adminEmailsOnChange(emails: string) {
    this.isAdminEmailsValid =
      emails.trim().length === 0 || this.isAdminEmailsOk(emails);
    this.adminEmails = emails;
  }

  @action
  async submit() {
    if (!this.tenantName || this.tenantName.trim().length === 0) {
      this.isTenantNameValid = false;
    }

    if (!this.adminEmails || this.adminEmails.trim().length === 0) {
      this.isAdminEmailsValid = false;
    }

    this.saveStatus = SAVE_STATUS.SAVING;
  }

  private isAdminEmailsOk(adminEmails: string | null): boolean {
    debugger;
    const admins = adminEmails?.split(',');
    if (!admins) {
      return false;
    }

    for (const admin of admins) {
      if (!this.validateEmail(admin.trim())) {
        return false;
      }
    }

    return true;
  }

  private validateEmail(mail: string) {
    const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return mail.match(mailFormat);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'authenticated/tenants/new': AuthenticatedTenantsNew;
  }
}
