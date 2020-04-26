import { EAppActionTypes } from 'entities/Auth/Auth.models';

export enum EEntityStatus {
  Enabled = 'enabled',
  Disabled = 'disabled',
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected'
}
export enum EAdminTabs {
  Applications = 'applications',
  Workspaces = 'workspaces'
}
export enum EEntityType {
  Application = 'application',
  Workspace = 'workspace'
}
export interface IApplication {
  organization: string;
  country: string;
  name: string;
  phone: string;
  email: string;
  website: string;
  details: string;
}
export interface IWorkspace {
  domain: string;
  name: string;
}
export interface IZelos {
  subdomain: string;
  email: string;
  password: string;
}

export interface IWorkspaceModelTo {
  application?: IApplication;
  workspace?: IWorkspace;
  zelos?: IZelos;
}
export interface IWorkspaceModelFrom {
  id: string;
  status: EEntityStatus;
  application: IApplication;
  workspace: IWorkspace;
}
export interface IWorkspaceValues extends IApplication, IWorkspace, IZelos {
  workspaceName: string;
  zelosEmail: string;
}

export interface IUpdateWorkspaceModelTo {
  id: string;
  action: EAppActionTypes;
  note?: string;
}

export interface IWorkspaceCollectionParams {
  offset?: number;
  limit?: number;
  status?: string;
}

export interface IWorkspaceMeta {
  count: number;
}

export interface IWorkspaceCollection {
  data: IWorkspaceModelFrom[];
  meta: IWorkspaceMeta;
}
