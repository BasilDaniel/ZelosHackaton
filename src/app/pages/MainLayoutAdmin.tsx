import React from 'react';
import { Card, Row, Table, Tabs } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ERoutes } from 'app/App';
import { communicationApplication, IApplicationConnectedProps } from 'entities/Application/Application.communication';
import { EWorkspaceStatus } from 'entities/Application/Application.models';

type AllProps = IApplicationConnectedProps & RouteComponentProps;

class MainLayoutAdminComponent extends React.Component<AllProps> {
  componentDidMount(): void {
    const activeTab = new URL(window.location.href).searchParams.get('tab') || EWorkspaceStatus.Enabled;

    this.onSwitchTab(activeTab);
  }

  render() {
    const { workspacesCollection } = this.props;
    const { data, loading } = workspacesCollection;
    const workspaceCollection = data?.data;

    const activeTab = new URL(window.location.href).searchParams.get('tab') || EWorkspaceStatus.Enabled;

    const columns = [
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

    return (
      <Row type="flex" justify="center">
        <Card className="application-card">
          <Tabs defaultActiveKey={activeTab} onChange={this.onSwitchTab}>
            <Tabs.TabPane tab="Applications" key={EWorkspaceStatus.Pending}>
              <Table columns={columns} dataSource={workspaceCollection} rowKey={'id'} pagination={false} loading={loading} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Workspaces" key={EWorkspaceStatus.Enabled}>
              <Table columns={columns} dataSource={workspaceCollection} rowKey={'id'} pagination={false} loading={loading} />
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </Row>
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
