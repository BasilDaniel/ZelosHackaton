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
  workspacesAppModel: StoreBranch<IWorkspaceModelFrom, IWorkspaceModelTo, any>;
  workspacesWsZModel: StoreBranch<IWorkspaceModelFrom, IWorkspaceModelTo, any>;
  workspacesWsModel: StoreBranch<IWorkspaceModelFrom, IWorkspaceModelTo, any>;
  workspacesAppCollection: StoreBranch<IWorkspaceCollection>;
  workspacesWsCollection: StoreBranch<IWorkspaceCollection>;
  addWorkspacesAppModel(model: IWorkspaceModelTo): void;
  addWorkspacesWsZModel(model: IWorkspaceModelTo): void;
  getWorkspacesAppModel(id: string): void;
  getWorkspacesWsModel(id: string): void;
  getWorkspacesAppCollection(params: IWorkspaceCollectionParams): void;
  getWorkspacesWsCollection(params: IWorkspaceCollectionParams): void;
  updateWorkspacesAppModel(params: IUpdateWorkspaceModelTo): void;
  updateWorkspacesWsModel(params: IUpdateWorkspaceModelTo): void;
  clearWorkspacesAppModel(): void;
  clearWorkspacesWsModel(): void;
}

const appCollectionApiProvider = [new APIProvider(actionsTypes.get, applicationTransport.getApplications)];

const wsCollectionApiProvider = [new APIProvider(actionsTypes.get, workspaceTransport.getWorkspaces)];

const appModelApiProvider = [
  new APIProvider(actionsTypes.add, applicationTransport.addApplication),
  new APIProvider(actionsTypes.get, applicationTransport.getApplication),
  new APIProvider(actionsTypes.update, applicationTransport.updateApplication, {
    postSuccessHook: function*() {
      yield put(push('/'));
    }
  })
];
const appWsZModelApiProvider = [new APIProvider(actionsTypes.add, applicationTransport.addApplication)];

const wsModelApiProvider = [
  new APIProvider(actionsTypes.get, workspaceTransport.getWorkspace),
  new APIProvider(actionsTypes.update, workspaceTransport.updateWorkspace, {
    postSuccessHook: function*() {
      yield put(push('/'));
    }
  })
];

const branches = [
  new Branch('appModel', appModelApiProvider),
  new Branch('wsZModel', appWsZModelApiProvider),
  new Branch('wsModel', wsModelApiProvider),
  new Branch('appCollection', appCollectionApiProvider),
  new Branch('wsCollection', wsCollectionApiProvider)
];

const strategy = new BaseStrategy({
  namespace,
  branches
});

const communicationApplication = buildCommunication<IApplicationConnectedProps>(strategy);

export { communicationApplication };
