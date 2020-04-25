import { actionsTypes, APIProvider, BaseStrategy, Branch, buildCommunication, StoreBranch } from '@axmit/redux-communications';
import { IWorkspaceModelTo, IWorkspaceModelFrom, IUpdateWorkspaceModelTo } from './Application.models';
import { applicationTransport } from './Application.transport';
import { put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

const namespace = 'workspaces';

export interface IApplicationConnectedProps {
  workspacesModel: StoreBranch<IWorkspaceModelFrom, IWorkspaceModelTo, any>;
  addWorkspacesModel(model: IWorkspaceModelTo): void;
  getWorkspacesModel(id: string): void;
  updateWorkspacesModel(params: IUpdateWorkspaceModelTo): void;
  clearWorkspacesModel(): void;
}

const modelApiProvider = [
  new APIProvider(actionsTypes.add, applicationTransport.addWorkspace),
  new APIProvider(actionsTypes.get, applicationTransport.getWorkspace),
  new APIProvider(actionsTypes.update, applicationTransport.updateWorkspace, {
    postSuccessHook: function*() {
      yield put(push('/'));
    }
  })
];

const branches = [new Branch('model', modelApiProvider)];

const strategy = new BaseStrategy({
  namespace,
  branches
});

const communicationApplication = buildCommunication<IApplicationConnectedProps>(strategy);

export { communicationApplication };
