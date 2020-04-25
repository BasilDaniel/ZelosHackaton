import { actionsTypes, APIProvider, BaseStrategy, Branch, buildCommunication, StoreBranch } from '@axmit/redux-communications';
import { push } from 'connected-react-router';
import { put } from 'redux-saga/effects';
import {
  IWorkspaceModelTo,
  IWorkspaceModelFrom,
  IUpdateWorkspaceModelTo,
  IWorkspaceCollection,
  IWorkspaceCollectionParams
} from './Application.models';
import { applicationTransport } from './Application.transport';

const namespace = 'workspaces';

export interface IApplicationConnectedProps {
  workspacesModel: StoreBranch<IWorkspaceModelFrom, IWorkspaceModelTo, any>;
  workspacesCollection: StoreBranch<IWorkspaceCollection>;
  addWorkspacesModel(model: IWorkspaceModelTo): void;
  getWorkspacesModel(id: string): void;
  getWorkspacesCollection(params: IWorkspaceCollectionParams): void;
  updateWorkspacesModel(params: IUpdateWorkspaceModelTo): void;
  clearWorkspacesModel(): void;
}

const collectionApiProvider = [new APIProvider(actionsTypes.get, applicationTransport.getWorkspaces)];
const modelApiProvider = [
  new APIProvider(actionsTypes.add, applicationTransport.addWorkspace),
  new APIProvider(actionsTypes.get, applicationTransport.getWorkspace),
  new APIProvider(actionsTypes.update, applicationTransport.updateWorkspace, {
    postSuccessHook: function*() {
      yield put(push('/'));
    }
  })
];

const branches = [new Branch('model', modelApiProvider), new Branch('collection', collectionApiProvider)];

const strategy = new BaseStrategy({
  namespace,
  branches
});

const communicationApplication = buildCommunication<IApplicationConnectedProps>(strategy);

export { communicationApplication };
