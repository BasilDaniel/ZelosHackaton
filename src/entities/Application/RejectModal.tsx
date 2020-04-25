import React from 'react';
import { Button, Form, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import FormInput from 'common/components/Form/FormInput';

interface IComponentProps {
  modalVisible: boolean;
  onCancel: () => void;
}

export class RejectModal extends React.Component<IComponentProps> {
  render() {
    const { onCancel, modalVisible } = this.props;

    return (
      <Modal title="Confirm rejection" visible={modalVisible} footer={null} onCancel={onCancel} closable={false}>
        <Form onSubmit={this.rejectApp}>
          <div>
            <FormInput>
              <TextArea rows={4} />
            </FormInput>
          </div>
          <div className="row end">
            <Button className="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="danger" htmlType="submit" className="button ml-250">
              Reject
            </Button>
          </div>
        </Form>
      </Modal>
    );
  }

  rejectApp = () => {
    console.log('reject');
  };
}
