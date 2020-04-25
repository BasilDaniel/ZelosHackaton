import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Button, Card, Col, Icon, Row } from 'antd';
import { InfoItem } from 'entities/Application/InfoItem';
import { PopupModal } from 'entities/Application/PopupModal';

interface IComponentState {
  approveModalVisible: boolean;
  rejectModalVisible: boolean;
}

class ApplicationItemComponent extends React.Component<RouteComponentProps, IComponentState> {
  state = {
    approveModalVisible: false,
    rejectModalVisible: false
  };

  render() {
    const { approveModalVisible, rejectModalVisible } = this.state;

    const cardTitle = (
      <Row type="flex" align="middle">
        <span onClick={this.goBack} className="back-button">
          <Icon type="arrow-left" />
        </span>
        <span>Application</span>
      </Row>
    );

    return (
      <>
        <Row type="flex" justify="center">
          <Card title={cardTitle} className="application-card">
            <Row type="flex" gutter={24}>
              <Col md={12} xs={24}>
                <InfoItem fieldName="Organization" fieldValue="OPEC" />
                <InfoItem fieldName="Location" fieldValue="OPEC" />
                <InfoItem fieldName="Name" fieldValue="OPEC" />
                <InfoItem fieldName="Phone number" fieldValue="OPEC" />
                <InfoItem fieldName="Email address" fieldValue="OPEC" />
              </Col>
              <Col md={12} xs={24}>
                <InfoItem fieldName="Website" fieldValue="OPEC" />
                <InfoItem fieldName="About cause" fieldValue="OPEC" />
                <InfoItem fieldName="Domain" fieldValue="OPEC" />
              </Col>
            </Row>
            <div className="row end pt-200">
              <Button className="button" type="danger" onClick={this.showRejectModal}>
                Reject
              </Button>
              <Button className="button ml-250" type="primary" onClick={this.showApproveModal}>
                Approve
              </Button>
            </div>
          </Card>
        </Row>
        <PopupModal modalType="approve" modalVisible={approveModalVisible} onCancel={this.cancel} onOk={this.approveApp} />
        <PopupModal modalType="reject" modalVisible={rejectModalVisible} onCancel={this.cancel} onOk={this.rejectApp} />
      </>
    );
  }

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  approveApp = () => {
    console.log('approve');
  };

  rejectApp = () => {
    console.log('reject');
  };

  cancel = () => {
    this.setState({ approveModalVisible: false, rejectModalVisible: false });
  };

  showApproveModal = () => {
    this.setState(state => ({ approveModalVisible: !state.approveModalVisible }));
  };

  showRejectModal = () => {
    this.setState(state => ({ rejectModalVisible: !state.rejectModalVisible }));
  };
}

export const ApplicationItem = withRouter(ApplicationItemComponent);
