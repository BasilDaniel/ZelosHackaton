export enum EWorkspaceStatus {
  Enabled = 'enabled',
  Disabled = 'disabled',
  Pending = 'pending'
}
export enum EAppStatus {
  Approved = 'enabled',
  Rejected = 'disabled',
  Pending = 'pending'
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
  workspaceName: string;
}
export interface IZelos {
  subdomain: string;
  zelosEmail: string;
  password: string;
}

export interface IWorkspaceModelTo {
  application?: IApplication;
  workspace?: IWorkspace;
  zelos?: IZelos;
}
export interface IWorkspaceModelFrom {
  id: string;
  status: EWorkspaceStatus;
  application: IApplication;
  workspace: IWorkspace;
}
export interface IWorkspaceValues extends IApplication, IWorkspace, IZelos {}

export interface IUpdateWorkspaceModelTo {
  id: string;
  action: 'enable' | 'disable';
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
