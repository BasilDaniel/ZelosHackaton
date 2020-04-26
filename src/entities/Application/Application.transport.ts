import axios from 'axios';
import { objectToQuery } from 'common/helpers/filters.helper';
import { IUpdateWorkspaceModelTo, IWorkspaceModelTo, IWorkspaceCollectionParams } from './Application.models';

const basePathApplications = '/applications';
const basePathWorkspaces = '/workspaces';

export const applicationTransport = {
  addApplication: (model: IWorkspaceModelTo) => axios.post(`${basePathApplications}`, model).then(r => r.data),
  getApplication: (id: string) => axios.get(`${basePathApplications}/${id}`).then(r => r.data),
  getApplications: (params: IWorkspaceCollectionParams) =>
    axios.get(`${basePathApplications}${objectToQuery(params)}`).then(r => r.data),
  updateApplication: (params: IUpdateWorkspaceModelTo) =>
    axios.patch(`${basePathApplications}/${params.id}/${params.action}`, { ...params })
};
export const workspaceTransport = {
  getWorkspace: (id: string) => axios.get(`${basePathWorkspaces}/${id}`).then(r => r.data),
  getWorkspaces: (params: IWorkspaceCollectionParams) =>
    axios.get(`${basePathWorkspaces}${objectToQuery(params)}`).then(r => r.data),
  updateWorkspace: (params: IUpdateWorkspaceModelTo) =>
    axios.patch(`${basePathWorkspaces}/${params.id}/${params.action}`, { ...params })
};
