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
  application: IApplication;
  workspace: IWorkspace;
}
export interface IWorkspaceValues extends IApplication, IWorkspace, IZelos {}

export interface IUpdateWorkspaceModelTo {
  id: string;
  action: 'enable' | 'disable';
  note?: string;
}
