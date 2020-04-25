import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Button, Card, Col, Icon, Row } from 'antd';
import { InfoItem } from 'entities/Application/components/InfoItem';
import { UpdateAppModal } from 'entities/Application/components/UpdateAppModal';
import { communicationApplication, IApplicationConnectedProps } from 'entities/Application/Application.communication';
import { EAppActionTypes } from 'entities/Auth/Auth.models';
import { Spiner } from 'common/components/Spiner';
import NotFound from 'entities/Auth/components/NotFound';

interface IComponentState {
  approveModalVisible: boolean;
  rejectModalVisible: boolean;
}

type AllProps = IApplicationConnectedProps & RouteComponentProps<{ id: string }>;

class ApplicationItemComponent extends React.Component<AllProps, IComponentState> {
  state = {
    approveModalVisible: false,
    rejectModalVisible: false
  };

  componentDidMount(): void {
    const { match, getWorkspacesModel } = this.props;
    const id = match.params.id;

    getWorkspacesModel(id);
  }

  render() {
    const { approveModalVisible, rejectModalVisible } = this.state;
    const { workspacesModel } = this.props;
    const { data: workspaceData, loading } = workspacesModel;

    if (!workspaceData) {
      return loading ? <Spiner size="large" align="hover" /> : <NotFound />;
    }

    const { application, workspace } = workspaceData;
    const { organization, country, name, phone, email, details, website } = application;
    const { domain } = workspace;

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
              <Col sm={12} xs={24}>
                <InfoItem fieldName="Organization" fieldValue={organization} />
                <InfoItem fieldName="Location" fieldValue={country} />
                <InfoItem fieldName="Name" fieldValue={name} />
                <InfoItem fieldName="Phone number" fieldValue={phone} />
                <InfoItem fieldName="Email address" fieldValue={email} />
              </Col>
              <Col sm={12} xs={24}>
                <InfoItem fieldName="Website" fieldValue={website} />
                <InfoItem fieldName="About cause" fieldValue={details} />
                <InfoItem fieldName="Domain" fieldValue={domain} />
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
        <UpdateAppModal
          title="Create a workspace?"
          modalAction={EAppActionTypes.Enable}
          modalVisible={approveModalVisible}
          onCancel={this.cancel}
        />
        <UpdateAppModal
          title="Confirm rejecting"
          modalAction={EAppActionTypes.Disable}
          modalVisible={rejectModalVisible}
          onCancel={this.cancel}
        />
      </>
    );
  }

  goBack = () => {
    const { history } = this.props;
    history.goBack();
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

export const ApplicationItem = communicationApplication.injector(withRouter(ApplicationItemComponent));
