import { actionsTypes, APIProvider, BaseStrategy, Branch, buildCommunication, StoreBranch } from '@axmit/redux-communications';
import { IWorkspaceModelTo, IWorkspaceModelFrom } from './Application.models';
import { applicationTransport } from './Application.transport';

const namespace = 'workspaces';

export interface IApplicationConnectedProps {
  workspacesModel: StoreBranch<IWorkspaceModelFrom, IWorkspaceModelTo, any>;
  addWorkspacesModel(model: IWorkspaceModelTo): void;
  clearWorkspacesModel(): void;
}

const modelApiProvider = [new APIProvider(actionsTypes.add, applicationTransport.addWorkspace)];

const branches = [new Branch('model', modelApiProvider)];

const strategy = new BaseStrategy({
  namespace,
  branches
});

const communicationApplication = buildCommunication<IApplicationConnectedProps>(strategy);

export { communicationApplication };
