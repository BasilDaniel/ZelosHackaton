export enum EUserRole {
  Admin = 'admin',
  Client = 'client'
}

export interface IUserModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  gender: string;
  role: EUserRole;
  phone: number;
  title: string;
}

export interface IUserParams {
  userId: string;
  userModel: IUserModel;
}
export interface IEmailConfirm {
  token?: string | string[] | null;
}
export interface IEmailResend {
  email: string;
}
export interface IUserBlock {
  userId: string;
  data: {
    isBlock: boolean;
    reason?: string;
  };
}

export interface IClientModel extends IUserModel {}

export interface IUserMeta {
  count: number;
}
export interface IUserCollection {
  data: IUserModel[];
  meta: IUserMeta;
}

export interface IUserQueryParams {
  limit: number;
  offset: number;
  search?: string;
  'roles[]'?: EUserRole[];
}
