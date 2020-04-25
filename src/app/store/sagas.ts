import { all, takeEvery, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { message } from 'antd';
import { EResponseStatus } from 'common/helpers/errors.helper';
import { communicationAuth } from 'entities/Auth/Auth.communication';
import { communicationApplication } from 'entities/Application/Application.communication';

function* errorWatcher() {
  yield takeEvery('*', function* logger(action: any) {
    const status = action.payload && action.payload.status;
    if (action.type.match('FAIL')) {
      switch (status) {
        case EResponseStatus.Unauthorized:
          yield put(push(`/`));
          message.error(`Status: ${status}, error: ${action.payload.statusText}`);
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
  yield all([errorWatcher(), ...communicationAuth.sagas, ...communicationApplication.sagas]);
}
