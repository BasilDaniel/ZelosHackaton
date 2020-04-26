import { actionsTypes, APIProvider, BaseStrategy, Branch, buildCommunication, StoreBranch } from '@axmit/redux-communications';
import { goBack } from 'connected-react-router';
import { put } from 'redux-saga/effects';
import {
  IWorkspaceModelTo,
  IWorkspaceModelFrom,
  IUpdateWorkspaceModelTo,
  IWorkspaceCollection,
  IWorkspaceCollectionParams
} from './Application.models';
import { applicationTransport, workspaceTransport } from './Application.transport';
import { message } from 'antd';

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

const appCollectionApiProvider = [
  new APIProvider(actionsTypes.get, applicationTransport.getApplications, {
    preRequestDataMapper: function(
      response: IWorkspaceCollection | null,
      payload: IWorkspaceCollectionParams,
      branchState: StoreBranch<IWorkspaceCollection, IWorkspaceCollectionParams>
    ) {
      return branchState.data;
    }
  })
];

const wsCollectionApiProvider = [
  new APIProvider(actionsTypes.get, workspaceTransport.getWorkspaces, {
    preRequestDataMapper: function(
      response: IWorkspaceCollection | null,
      payload: IWorkspaceCollectionParams,
      branchState: StoreBranch<IWorkspaceCollection, IWorkspaceCollectionParams>
    ) {
      return branchState.data;
    }
  })
];

const appModelApiProvider = [
  new APIProvider(actionsTypes.add, applicationTransport.addApplication),
  new APIProvider(actionsTypes.get, applicationTransport.getApplication),
  new APIProvider(actionsTypes.update, applicationTransport.updateApplication, {
    preRequestDataMapper: function(
      response: IWorkspaceModelFrom | null,
      payload: IUpdateWorkspaceModelTo,
      branchState: StoreBranch<IWorkspaceModelFrom, IUpdateWorkspaceModelTo>
    ) {
      return branchState.data;
    },
    postFailHook: function*() {
      message.error('Error!', 3);
      yield put(goBack());
    },
    postSuccessHook: function*() {
      message.success('Success!', 3);
      yield put(goBack());
    }
  })
];
const appWsZModelApiProvider = [new APIProvider(actionsTypes.add, applicationTransport.addApplication)];

const wsModelApiProvider = [
  new APIProvider(actionsTypes.get, workspaceTransport.getWorkspace),
  new APIProvider(actionsTypes.update, workspaceTransport.updateWorkspace, {
    preRequestDataMapper: function(
      response: IWorkspaceModelFrom | null,
      payload: IUpdateWorkspaceModelTo,
      branchState: StoreBranch<IWorkspaceModelFrom, IUpdateWorkspaceModelTo>
    ) {
      return branchState.data;
    },
    postFailHook: function*() {
      message.error('Error!', 3);
      yield put(goBack());
    },
    postSuccessHook: function*() {
      message.success('Success!', 3);
      yield put(goBack());
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
