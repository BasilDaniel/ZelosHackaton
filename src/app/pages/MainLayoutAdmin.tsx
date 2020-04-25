import React from 'react';
import { Table, Tabs } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import LogoutButton from 'common/components/LogoutButton';
import { ERoutes } from 'app/App';
import { communicationApplication, IApplicationConnectedProps } from 'entities/Application/Application.communication';
import { EWorkspaceStatus } from 'entities/Application/Application.models';

type AllProps = IApplicationConnectedProps & RouteComponentProps;

class MainLayoutAdminComponent extends React.Component<AllProps> {
  componentDidMount(): void {
    const activeTab = new URL(window.location.href).searchParams.get('tab') || EWorkspaceStatus.Pending;

    this.onSwitchTab(activeTab);
  }

  render() {
    const { workspacesCollection } = this.props;
    const { data, loading } = workspacesCollection;
    const workspaceCollection = data?.data;

    const activeTab = new URL(window.location.href).searchParams.get('tab') || EWorkspaceStatus.Pending;

    const appColumns = [
      {
        title: 'Name',
        dataIndex: 'application.name'
      },
      {
        title: 'Email',
        dataIndex: 'application.email'
      },
      {
        title: '',
        render: record => (
          <div onClick={() => this.goToAppItem(record)} className="pointer">
            View
          </div>
        )
      }
    ];

    const wsColumns = [
      {
        title: 'Workspace',
        dataIndex: 'workspace.domain'
      },
      {
        title: '',
        render: record => (
          <div onClick={() => this.goToAppItem(record)} className="link-to-item">
            View
          </div>
        )
      }
    ];

    return (
      <div className="layout-basic__admin-layout">
        <LogoutButton />

        <Tabs defaultActiveKey={activeTab} onChange={this.onSwitchTab} className="app-table">
          <Tabs.TabPane tab="Applications" key={EWorkspaceStatus.Pending}>
            <Table
              className="app-table"
              columns={appColumns}
              dataSource={workspaceCollection}
              rowKey={'id'}
              pagination={false}
              loading={loading}
              bordered
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Workspaces" key={EWorkspaceStatus.Enabled}>
            <Table
              className="app-table"
              columns={wsColumns}
              dataSource={workspaceCollection}
              rowKey={'id'}
              pagination={false}
              loading={loading}
              bordered
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }

  goToAppItem = record => {
    const { history } = this.props;

    history.push(`${ERoutes.Application}/${record.id}`);
  };

  onSwitchTab = (activeKey: string) => {
    const { getWorkspacesCollection, history } = this.props;
    history.push({ search: `?tab=${activeKey}` });

    getWorkspacesCollection({ status: activeKey });
  };
}

export const MainLayoutAdmin = communicationApplication.injector(withRouter(MainLayoutAdminComponent));
