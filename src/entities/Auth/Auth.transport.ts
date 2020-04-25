import axios, { AxiosResponse, AxiosPromise } from 'axios';
import { getCreds } from '@axmit/axios-patch-jwt';
import { ILoginModel, ISignUpModel, ITokenModel } from 'entities/Auth/Auth.models';

const basePath = '/auth';

export const authTransport = {
  initAuth: (): AxiosPromise<ITokenModel> => getCreds(),
  addAuthModel: (data: ILoginModel): AxiosPromise<ITokenModel> => axios.post(`${basePath}/login`, data).then(r => r.data),
  deleteAuthModel: (): AxiosPromise<AxiosResponse<void>> => axios.delete(`${basePath}`),
  addRegistration: (params: ISignUpModel): AxiosPromise<void> => axios.post('/registration', params).then(r => r.data)
};
