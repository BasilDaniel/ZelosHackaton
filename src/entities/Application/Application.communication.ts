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
import { applicationTransport, workspaceTransport } from './Application.transport';

const namespace = 'workspaces';

export interface IApplicationConnectedProps {
  workspacesModel: StoreBranch<IWorkspaceModelFrom, IWorkspaceModelTo, any>;
  workspacesAppCollection: StoreBranch<IWorkspaceCollection>;
  workspacesWsCollection: StoreBranch<IWorkspaceCollection>;
  addWorkspacesModel(model: IWorkspaceModelTo): void;
  getWorkspacesModel(id: string): void;
  getWorkspacesAppCollection(params: IWorkspaceCollectionParams): void;
  getWorkspacesWsCollection(params: IWorkspaceCollectionParams): void;
  updateWorkspacesModel(params: IUpdateWorkspaceModelTo): void;
  clearWorkspacesModel(): void;
}

const appCollectionApiProvider = [new APIProvider(actionsTypes.get, applicationTransport.getApplications)];

const wsCollectionApiProvider = [new APIProvider(actionsTypes.get, workspaceTransport.getWorkspaces)];

const modelApiProvider = [
  new APIProvider(actionsTypes.add, applicationTransport.addApplication),
  new APIProvider(actionsTypes.get, applicationTransport.getApplication),
  new APIProvider(actionsTypes.update, applicationTransport.updateApplication, {
    postSuccessHook: function*() {
      yield put(push('/'));
    }
  }),
  new APIProvider(actionsTypes.get, workspaceTransport.getWorkspace),
  new APIProvider(actionsTypes.update, workspaceTransport.updateWorkspace, {
    postSuccessHook: function*() {
      yield put(push('/'));
    }
  })
];

const branches = [
  new Branch('model', modelApiProvider),
  new Branch('appCollection', appCollectionApiProvider),
  new Branch('wsCollection', wsCollectionApiProvider)
];

const strategy = new BaseStrategy({
  namespace,
  branches
});

const communicationApplication = buildCommunication<IApplicationConnectedProps>(strategy);

export { communicationApplication };
