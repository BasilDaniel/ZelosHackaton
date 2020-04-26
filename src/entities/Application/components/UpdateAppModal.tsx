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
    const { onCancel, modalVisible, workspacesAppModel, title, modalAction } = this.props;
    const { loading } = workspacesAppModel;
    const reject = modalAction === EAppActionTypes.Reject;

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
    const { workspacesAppModel, modalAction } = this.props;
    const { loading } = workspacesAppModel;

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
            type="danger"
            htmlType="submit"
            onClick={() => this.updateApp(EAppActionTypes.Reject)}
            loading={loading}
            disabled={loading}
          >
            Reject
          </Button>
        );
      case EAppActionTypes.Approve:
        return (
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => this.updateApp(EAppActionTypes.Approve)}
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
    const { workspacesWsModel, updateWorkspacesWsModel } = this.props;
    const id = workspacesWsModel.data?.id;

    if (id) {
      modalAction !== EAppActionTypes.Reject && updateWorkspacesWsModel({ id, action: modalAction });
    }
  };

  updateApp = (modalAction: EAppActionTypes) => {
    const { text } = this.state;
    const { workspacesAppModel, updateWorkspacesAppModel } = this.props;
    const id = workspacesAppModel.data?.id;

    if (id) {
      modalAction !== EAppActionTypes.Reject && updateWorkspacesAppModel({ id, action: modalAction, note: text });
    }
  };
}

export const UpdateAppModal = communicationApplication.injector(withRouter(UpdateAppModalComponent));
