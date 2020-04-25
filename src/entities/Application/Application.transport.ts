import axios from 'axios';
import { objectToQuery } from 'common/helpers/filters.helper';
import { IUpdateWorkspaceModelTo, IWorkspaceModelTo, IWorkspaceCollectionParams } from './Application.models';

const basePath = '/workspaces';

export const applicationTransport = {
  addWorkspace: (model: IWorkspaceModelTo) => axios.post(`${basePath}`, model).then(r => r.data),
  getWorkspace: (id: string) => axios.get(`${basePath}/${id}`).then(r => r.data),
  getWorkspaces: (params: IWorkspaceCollectionParams) => axios.get(`${basePath}${objectToQuery(params)}`).then(r => r.data),
  updateWorkspace: (params: IUpdateWorkspaceModelTo) => axios.patch(`${basePath}/${params.id}/${params.action}`, { ...params })
};
