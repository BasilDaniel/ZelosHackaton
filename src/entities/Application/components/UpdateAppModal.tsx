import React from 'react';
import { Button, Modal } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';

import { communicationApplication, IApplicationConnectedProps } from 'entities/Application/Application.communication';
import { EAppActionTypes } from 'entities/Auth/Auth.models';
import { ButtonWrapper } from 'common/components/ButtonWrapper';

interface IComponentProps {
  title: string;
  modalAction: EAppActionTypes | null;
  modalVisible: boolean;
  onCancel: () => void;
}

interface IComponentState {
  text: string;
}

type AllProps = IApplicationConnectedProps & IComponentProps & RouteComponentProps;

class UpdateAppModalComponent extends React.Component<AllProps, IComponentState> {
  state = {
    text: ''
  };

  render() {
    const { onCancel, modalVisible, workspacesModel, title, modalAction } = this.props;
    const { loading } = workspacesModel;
    const reject = modalAction === EAppActionTypes.Disable;

    return (
      <Modal title={title} visible={modalVisible} footer={null} onCancel={onCancel} closable={false} className="update-app-modal">
        {reject && (
          <>
            <div className="pb-100">Give a reason for the rejection (optional)</div>
            <TextArea rows={4} className="mb-200" onChange={e => this.onTextChange(e)} />
          </>
        )}
        <ButtonWrapper align="right">
          <Button onClick={onCancel} loading={loading} disabled={loading}>
            Cancel
          </Button>
          {this.getActionButton()}
        </ButtonWrapper>
      </Modal>
    );
  }

  getActionButton = () => {
    const { workspacesModel, modalAction } = this.props;
    const { loading } = workspacesModel;

    switch (modalAction) {
      case EAppActionTypes.Enable:
        return (
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => this.updateWorkspace(EAppActionTypes.Enable)}
            loading={loading}
            disabled={loading}
          >
            Enable
          </Button>
        );
      case EAppActionTypes.Disable:
        return (
          <Button
            type="danger"
            htmlType="submit"
            onClick={() => this.updateWorkspace(EAppActionTypes.Disable)}
            loading={loading}
            disabled={loading}
          >
            Disable
          </Button>
        );
      case EAppActionTypes.Reject:
        return (
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => this.updateApp(EAppActionTypes.Reject)}
            loading={loading}
            disabled={loading}
          >
            Reject
          </Button>
        );
      default:
        return null;
    }
  };

  onTextChange = e => {
    this.setState({ text: e.target.value });
  };

  updateWorkspace = (modalAction: EAppActionTypes) => {
    const { workspacesModel, updateWorkspacesModel } = this.props;
    const id = workspacesModel.data?.id;

    if (id) {
      modalAction !== EAppActionTypes.Reject && updateWorkspacesModel({ id, action: modalAction });
    }
  };

  updateApp = (modalAction: EAppActionTypes) => {
    const { text } = this.state;
    const { workspacesModel, updateWorkspacesModel } = this.props;
    const id = workspacesModel.data?.id;

    if (id) {
      modalAction !== EAppActionTypes.Reject && updateWorkspacesModel({ id, action: modalAction, note: text });
    }
  };
}

export const UpdateAppModal = communicationApplication.injector(withRouter(UpdateAppModalComponent));
