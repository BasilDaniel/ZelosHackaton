import axios from 'axios';
import { IWorkspaceModelTo } from './Application.models';

const basePath = '/workspaces';

export const applicationTransport = {
  addWorkspace: (model: IWorkspaceModelTo) => {
    return new Promise(resolve => {
      resolve({
        id: 'string',
        application: {
          organization: model.application?.organization || '',
          country: model.application?.country || '',
          name: model.application?.name || '',
          phone: model.application?.phone || '',
          email: model.application?.website || '',
          website: model.application?.website || '',
          details: model.application?.details || ''
        },
        workspace: {
          domain: model.workspace?.domain || '',
          workspaceName: model.workspace?.workspaceName || ''
        }
      });
    });
  }
  // axios.post(`${basePath}`, model).then(r => r.data)
};
