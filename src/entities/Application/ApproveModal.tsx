import React from 'react';
import { Button, Form, Modal } from 'antd';

interface IComponentProps {
  modalVisible: boolean;
  onCancel: () => void;
}

export class ApproveModal extends React.Component<IComponentProps> {
  render() {
    const { modalVisible, onCancel } = this.props;

    return (
      <Modal title="Create a workspace?" visible={modalVisible} footer={null} onCancel={onCancel} closable={false}>
        <Form onSubmit={this.approveApp}>
          <div className="row end">
            <Button className="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="button ml-250">
              Approve
            </Button>
          </div>
        </Form>
      </Modal>
    );
  }

  approveApp = () => {
    console.log('approve');
  };
}
