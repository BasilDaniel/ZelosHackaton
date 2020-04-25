import React from 'react';
import { Card, Row, Tabs } from 'antd';

class MainLayoutAdminComponent extends React.Component {
  render() {
    return (
      <Row type="flex" justify="center">
        <Card className="application-card">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Tab 1" key="1">
              Content of Tab Pane 1
            </Tabs.TabPane>
            <Tabs.TabPane tab="Tab 2" key="2">
              Content of Tab Pane 2
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </Row>
    );
  }
}

export const MainLayoutAdmin = MainLayoutAdminComponent;
