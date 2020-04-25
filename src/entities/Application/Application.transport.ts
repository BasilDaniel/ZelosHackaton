import axios from 'axios';
import { IUpdateWorkspaceModelTo, IWorkspaceModelTo } from './Application.models';

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
  },
  getWorkspace: (id: string) => axios.get(`${basePath}/${id}`).then(r => r.data),
  updateWorkspace: (params: IUpdateWorkspaceModelTo) => axios.patch(`${basePath}/${params.id}/${params.action}`, { ...params })
  // axios.post(`${basePath}`, model).then(r => r.data)
};
