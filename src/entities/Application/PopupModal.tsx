import React from 'react';
import { Button, Modal } from 'antd';

interface IComponentProps {
  modalVisible: boolean;
  modalType: string;
  onCancel: () => void;
  onOk: () => void;
}

export class PopupModal extends React.Component<IComponentProps> {
  render() {
    const { modalVisible, onCancel, onOk, modalType } = this.props;
    const reject = modalType === 'reject';

    return (
      <Modal title="Create a workspace?" visible={modalVisible} footer={null} onCancel={onCancel} closable={false}>
        <div className="row end">
          <Button className="button" onClick={onCancel}>
            Cancel
          </Button>
          {reject ? (
            <Button type="danger" className="button ml-250" onClick={onOk}>
              Reject
            </Button>
          ) : (
            <Button type="primary" className="button ml-250" onClick={onOk}>
              Approve
            </Button>
          )}
        </div>
      </Modal>
    );
  }
}
