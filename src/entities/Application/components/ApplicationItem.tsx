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
import { EEntityType, EEntityStatus } from 'entities/Application/Application.models';

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
    const { match, getWorkspacesAppModel, getWorkspacesWsModel } = this.props;
    const id = match.params.id;

    const type = new URL(window.location.href).searchParams.get('type');

    if (type === EEntityType.Application) {
      getWorkspacesAppModel(id);
    }
    if (type === EEntityType.Workspace) {
      getWorkspacesWsModel(id);
    }
  }

  render() {
    const { modalVisible, modalTitle, modalAction } = this.state;
    const { workspacesAppModel, workspacesWsModel } = this.props;

    const type = new URL(window.location.href).searchParams.get('type');

    const { data: entityData, loading } = type === EEntityType.Application ? workspacesAppModel : workspacesWsModel;

    if (!entityData) {
      return loading ? <Spiner size="large" align="hover" /> : <NotFound />;
    }

    const entity = entityData.application;

    if (!entity) {
      return null;
    }

    const { workspace, status } = entityData;
    const { organization, country, name, phone, email, details, website } = entity;
    const { domain } = workspace;

    const cardTitle = (
      <Row type="flex" align="middle">
        <span onClick={this.goBack} className="back-button">
          <Icon type="arrow-left" />
        </span>
        <span>
          {type && type[0].toUpperCase() + type.slice(1)} {status}
        </span>
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

  getButtons = (status: EEntityStatus) => {
    switch (status) {
      case EEntityStatus.Pending:
        return (
          <ButtonWrapper align="right">
            <Button type="danger" onClick={() => this.showModal('Confirm rejecting', EAppActionTypes.Reject)}>
              Reject
            </Button>
            <Button type="primary" onClick={() => this.showModal('Create a workspace?', EAppActionTypes.Approve)}>
              Approve
            </Button>
          </ButtonWrapper>
        );
      case EEntityStatus.Enabled:
        return (
          <ButtonWrapper align="right">
            <Button type="danger" onClick={() => this.showModal('Disable workspace?', EAppActionTypes.Disable)}>
              Disable
            </Button>
          </ButtonWrapper>
        );
      case EEntityStatus.Disabled:
        return (
          <ButtonWrapper align="right">
            <Button type="primary" onClick={() => this.showModal('Enable workspace?', EAppActionTypes.Enable)}>
              Enable
            </Button>
          </ButtonWrapper>
        );
      case EEntityStatus.Approved:
      default:
        return <></>;
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
