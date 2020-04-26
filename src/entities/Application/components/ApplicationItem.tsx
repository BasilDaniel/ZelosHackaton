import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, Card, Col, Icon, Row } from 'antd';
import { Spiner } from 'common/components/Spiner';
import { ButtonWrapper } from 'common/components/ButtonWrapper';
import { InfoItem } from 'entities/Application/components/InfoItem';
import { UpdateAppModal } from 'entities/Application/components/UpdateAppModal';
import { communicationApplication, IApplicationConnectedProps } from 'entities/Application/Application.communication';
import { EAppActionTypes } from 'entities/Auth/Auth.models';
import NotFound from 'entities/Auth/components/NotFound';
import { EWorkspaceStatus } from 'entities/Application/Application.models';

interface IComponentState {
  modalVisible: boolean;
  modalTitle?: string;
  modalAction: EAppActionTypes | null;
}

type AllProps = IApplicationConnectedProps & RouteComponentProps<{ id: string }>;

class ApplicationItemComponent extends React.Component<AllProps, IComponentState> {
  state = {
    modalVisible: false,
    modalTitle: '',
    modalAction: null
  };

  componentDidMount(): void {
    const { match, getWorkspacesModel } = this.props;
    const id = match.params.id;

    getWorkspacesModel(id);
  }

  render() {
    const { modalVisible, modalTitle, modalAction } = this.state;
    const { workspacesModel } = this.props;
    const { data: workspaceData, loading } = workspacesModel;

    if (!workspaceData) {
      return loading ? <Spiner size="large" align="hover" /> : <NotFound />;
    }

    const application = workspaceData.application;

    if (!application) {
      return null;
    }

    const { workspace, status } = workspaceData;
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
            {this.getButtons(status)}
          </Card>
        </Row>
        <UpdateAppModal title={modalTitle} modalAction={modalAction} modalVisible={modalVisible} onCancel={this.cancel} />
      </>
    );
  }

  getButtons = (status: EWorkspaceStatus) => {
    switch (status) {
      case EWorkspaceStatus.Pending:
        return (
          <ButtonWrapper align="right">
            <Button type="danger" onClick={() => this.showModal('Confirm rejecting', EAppActionTypes.Reject)}>
              Reject
            </Button>
            <Button type="primary" onClick={() => this.showModal('Create a workspace?', EAppActionTypes.Enable)}>
              Approve
            </Button>
          </ButtonWrapper>
        );
      case EWorkspaceStatus.Enabled:
        return (
          <ButtonWrapper align="right">
            <Button type="danger" onClick={() => this.showModal('Disable workspace?', EAppActionTypes.Disable)}>
              Disable
            </Button>
          </ButtonWrapper>
        );
      case EWorkspaceStatus.Disabled:
        return (
          <ButtonWrapper align="right">
            <Button type="primary" onClick={() => this.showModal('Enable workspace?', EAppActionTypes.Enable)}>
              Enable
            </Button>
          </ButtonWrapper>
        );
    }
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  cancel = () => {
    this.setState({ modalVisible: false });
  };

  showModal = (modalTitle: string, modalAction: EAppActionTypes) => {
    this.setState(state => ({ modalVisible: !state.modalVisible, modalTitle, modalAction }));
  };
}

export const ApplicationItem = communicationApplication.injector(withRouter(ApplicationItemComponent));
