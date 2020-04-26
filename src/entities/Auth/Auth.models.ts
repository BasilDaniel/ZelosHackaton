export interface ISignUpModel {
  email: string;
  password: string;
  role: string;
  birthday: string;
  firstName: string;
  lastName: string;
  gender: string;
}
export interface ILoginModel {
  email: string;
  password: string;
}
export interface IAuthUser {
  email: string;
  role: string;
  status: string;
}

export interface ITokenModel {
  refresh: ITokenData;
  access: ITokenData;
}

export interface ITokenData {
  userId: string;
  token: string;
  issuedAt: number;
  expiredAt: number;
}

export interface IErrorReturnData {
  errors: {
    [key: string]: string[];
  };
  message: string;
  status: number;
}
export interface IAuthRegistrationModel extends IErrorReturnData {
  data: null;
}

export enum EAppActionTypes {
  Enable = 'enable',
  Disable = 'disable',
  Reject = 'reject'
}