import { actionsTypes, APIProvider, BaseStrategy, Branch, buildCommunication, StoreBranch } from '@axmit/redux-communications';
import { call, put } from 'redux-saga/effects';
import { clearCreds, saveCreds } from '@axmit/axios-patch-jwt';
import { message } from 'antd';
import { push } from 'connected-react-router';
import { EResponseStatus } from 'common/helpers/errors.helper';
import { ITokenModel, IAuthRegistrationModel, ILoginModel, ISignUpModel } from 'entities/Auth/Auth.models';
import { authTransport } from 'entities/Auth/Auth.transport';

const namespace = 'auth';

export interface IAuthConnectedProps {
  authModel: StoreBranch<ITokenModel, ILoginModel, any>;
  authRegistration: StoreBranch<IAuthRegistrationModel, ISignUpModel, any>;
  initAuthModel(): void;
  addAuthModel(params: ILoginModel): void;
  deleteAuthModel(): void;
  addAuthRegistration(params: ISignUpModel): void;
  clearAuthModel(): void;
  clearAuthRegistration(): void;
}

const modelApiProvider = [
  new APIProvider(actionsTypes.add, authTransport.addAuthModel, {
    postSuccessHook: function*(response: any) {
      yield call(saveCreds, response);
      yield put(push('/'));
    },
    postFailHook: function*(response: any) {
      if (response.status === EResponseStatus.NotFound) {
        message.error('These credentials do not match our records', 2);
      } else {
        yield put(push('/'));
      }
    }
  }),
  new APIProvider(actionsTypes.delete, authTransport.deleteAuthModel, {
    postSuccessHook: function*() {
      yield logout();
    }
  }),
  new APIProvider(actionsTypes.init, authTransport.initAuth)
];

const registrationApiProvider = [
  new APIProvider(actionsTypes.add, authTransport.addRegistration, {
    postSuccessHook: function*() {
      yield put(push(`/`));
    }
  })
];

const branches = [
  new Branch('model', modelApiProvider, new StoreBranch<ITokenModel, any>(null, null, null, true)),
  new Branch('registration', registrationApiProvider)
];

const strategy = new BaseStrategy({
  namespace,
  branches
});

const communicationAuth = buildCommunication<IAuthConnectedProps>(strategy);

export { communicationAuth };

export function* logout() {
  yield call(clearCreds);
  yield put({ type: 'CLEAR_STORE' });
}
