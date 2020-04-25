import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Button, Card, Col, Icon, Row } from 'antd';
import { InfoItem } from 'entities/Application/InfoItem';

class ApplicationItemComponent extends React.Component<RouteComponentProps> {
  render() {
    const cardTitle = (
      <Row type="flex" align="middle">
        <span onClick={() => this.goBack()} className="back-button">
          <Icon type="arrow-left" />
        </span>
        <span>Application</span>
      </Row>
    );

    return (
      <Row type="flex" justify="center">
        <Card title={cardTitle} className="application-card">
          <Row type="flex" gutter={24}>
            <Col md={12} xs={24}>
              <InfoItem fieldName="org" fieldValue="OPEC" />
              <InfoItem fieldName="org" fieldValue="OPEC" />
              <InfoItem fieldName="org" fieldValue="OPEC" />
              <InfoItem fieldName="org" fieldValue="OPEC" />
            </Col>
            <Col md={12} xs={24}>
              <InfoItem fieldName="org" fieldValue="OPEC" />
              <InfoItem fieldName="org" fieldValue="OPEC" />
              <InfoItem fieldName="org" fieldValue="OPEC" />
              <InfoItem fieldName="org" fieldValue="OPEC" />
            </Col>
          </Row>
          <div className="row end pt-200">
            <Button className="button" type="danger" onClick={() => {}}>
              Reject
            </Button>
            <Button className="button ml-250" type="primary" onClick={() => {}}>
              Approve
            </Button>
          </div>
        </Card>
      </Row>
    );
  }

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };
}

export const ApplicationItem = withRouter(ApplicationItemComponent);
