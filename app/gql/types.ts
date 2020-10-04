export enum UserRoleType {
  ADMIN = 'ADMIN',
  TENANT_ADMIN = 'TENANT_ADMIN',
  APP_ADMIN = 'APP_ADMIN',
}

export interface UserRole {
  type: UserRoleType;
  ids?: string[];
}

export interface User {
  id: string;
  email: string;
  roles: UserRole[];
}

export interface Tenant {
  id: string;
  name: string;
}

export interface AddTenantInput {
  name: string;
  adminEmails: string;
}

export interface App {
  id: string;
  name: string;
  owner: string;
}

export interface AddAppInput {
  name: string;
  owner: string;
}

export interface Privilege {
  id: string;
  app: App;
  name: string;
  order: string;
  short?: string;
  tags?: string[];
}

export interface AddPrivilegeInput {
  name: string;
  short?: string;
  tags?: string[];
}

export interface UpdatePrivilegeInput {
  name?: string;
  short?: string;
  tags?: string[];
}

export interface PrivilegePool {
  id: string;
  app: App;
  name: string;
  order: string;
  privileges: Privilege[];
  short?: string;
  tags?: string;
}

export interface AddPrivilegePoolInput {
  name: string;
  short?: string;
  tags?: string[];
  privilegeIds: string[];
}
