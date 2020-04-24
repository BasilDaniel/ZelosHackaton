import { all, takeEvery, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { message } from 'antd';
import { EResponseStatus } from 'common/helpers/errors.helper';
import { ERoutes } from 'app/App';
import { communicationAuth } from 'entities/Auth/Auth.communication';
import { communicationUsers } from 'entities/User/User.communication';
import { communicationDictionary } from 'entities/Dictionary/Dictionary.communication';

function* errorWatcher() {
  yield takeEvery('*', function* logger(action: any) {
    const status = action.payload && action.payload.status;
    if (action.type.match('FAIL')) {
      switch (status) {
        case EResponseStatus.Unauthorized:
          yield put(push(`/${ERoutes.Login}`));
          return;
        case EResponseStatus.InternalServerError:
          message.error(`Status: ${status}, error: ${action.payload.statusText}`);
          return;

        default:
      }
    }
  });
}

export default function* rootSaga() {
  yield all([errorWatcher(), ...communicationAuth.sagas, ...communicationUsers.sagas, ...communicationDictionary.sagas]);
}
