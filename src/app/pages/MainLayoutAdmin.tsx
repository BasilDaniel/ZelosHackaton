import React from 'react';
import { Table, Tabs, Tag } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import LogoutButton from 'common/components/LogoutButton';
import { ERoutes } from 'app/App';
import { communicationApplication, IApplicationConnectedProps } from 'entities/Application/Application.communication';
import { EAdminTabs, EEntityStatus, EEntityType } from 'entities/Application/Application.models';

type AllProps = IApplicationConnectedProps & RouteComponentProps;

class MainLayoutAdminComponent extends React.Component<AllProps> {
  componentDidMount(): void {
    const activeTab = new URL(window.location.href).searchParams.get('tab') || EAdminTabs.Applications;

    this.onSwitchTab(activeTab);
  }

  render() {
    const { workspacesAppCollection, workspacesWsCollection } = this.props;
    const { data: apps, loading: appsLoading } = workspacesAppCollection;
    const { data: ws, loading: wsLoading } = workspacesWsCollection;
    const appsCollection = apps?.data;
    const wsCollection = ws?.data;

    const activeTab = new URL(window.location.href).searchParams.get('tab') || EAdminTabs.Applications;

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
          <div onClick={() => this.goToAppItem(record, EEntityType.Application)} className="link-to-item">
            View
          </div>
        )
      }
    ];

    const wsColumns = [
      {
        title: 'Organization',
        dataIndex: 'workspace.name'
      },
      {
        title: 'Subdomain',
        dataIndex: 'workspace.domain'
      },
      {
        title: 'Status',
        dataIndex: 'status',
        render: text => {
          return text === EEntityStatus.Enabled ? <Tag color="green">Running</Tag> : text[0].toUpperCase() + text.slice(1);
        }
      },
      {
        title: '',
        render: record => (
          <div onClick={() => this.goToAppItem(record, EEntityType.Workspace)} className="link-to-item">
            View
          </div>
        )
      }
    ];

    return (
      <div className="layout-basic__admin-layout">
        <LogoutButton />

        <Tabs defaultActiveKey={activeTab} onChange={this.onSwitchTab} className="app-table">
          <Tabs.TabPane tab="Applications" key={EAdminTabs.Applications}>
            <Table
              className="app-table"
              columns={appColumns}
              dataSource={appsCollection}
              rowKey={'id'}
              pagination={false}
              loading={appsLoading}
              bordered
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Workspaces" key={EAdminTabs.Workspaces}>
            <Table
              className="app-table"
              columns={wsColumns}
              dataSource={wsCollection}
              rowKey={'id'}
              pagination={false}
              loading={wsLoading}
              bordered
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }

  goToAppItem = (record, type: string) => {
    const { history } = this.props;

    history.push(`${ERoutes.Application}/${record.id}?type=${type}`);
  };

  onSwitchTab = (activeKey: string) => {
    const { getWorkspacesAppCollection, getWorkspacesWsCollection, history } = this.props;
    history.push({ search: `?tab=${activeKey}` });

    switch (activeKey) {
      case EAdminTabs.Applications:
        getWorkspacesAppCollection({ status: EEntityStatus.Pending });
        break;
      case EAdminTabs.Workspaces:
        getWorkspacesWsCollection({});
        break;
    }
  };
}

export const MainLayoutAdmin = communicationApplication.injector(withRouter(MainLayoutAdminComponent));
