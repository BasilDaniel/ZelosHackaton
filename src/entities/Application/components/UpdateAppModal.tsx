import React from 'react';
import { Button, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { communicationApplication, IApplicationConnectedProps } from 'entities/Application/Application.communication';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { EAppActionTypes } from 'entities/Auth/Auth.models';

interface IComponentProps {
  title: string;
  modalAction: EAppActionTypes;
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
        <div className="row end">
          <Button className="button" onClick={onCancel} loading={loading} disabled={loading}>
            Cancel
          </Button>
          {reject ? (
            <Button
              type="danger"
              htmlType="submit"
              className="button ml-250"
              onClick={this.updateApp}
              loading={loading}
              disabled={loading}
            >
              Reject
            </Button>
          ) : (
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.updateApp}
              className="button ml-250"
              loading={loading}
              disabled={loading}
            >
              Approve
            </Button>
          )}
        </div>
      </Modal>
    );
  }

  onTextChange = e => {
    this.setState({ text: e.target.value });
  };

  updateApp = () => {
    const { text } = this.state;
    const { modalAction, workspacesModel, updateWorkspacesModel } = this.props;
    const id = workspacesModel.data?.id;

    if (id) {
      updateWorkspacesModel({ id, action: modalAction, note: text });
    }
  };
}

export const UpdateAppModal = communicationApplication.injector(withRouter(UpdateAppModalComponent));
