import React from 'react';
import { Tabs } from 'antd';

class MainLayoutAdmin extends React.Component {
  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Tab 1" key="1">
            Content of Tab Pane 1
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}
export default MainLayoutAdmin;
