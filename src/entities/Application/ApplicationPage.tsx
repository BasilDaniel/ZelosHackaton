import React from 'react';
import { Button, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { LayoutBasic } from 'common/components/LayoutBasic';
import { Spiner } from 'common/components/Spiner';
import { PersonInfoForm } from './PersonInfoForm';
import { communicationApplication, IApplicationConnectedProps } from './Application.communication';
import { IWorkspaceModelTo, IWorkspaceValues } from './Application.models';

type AllProps = FormComponentProps & IApplicationConnectedProps;

class ApplicationPage extends React.Component<AllProps> {
  componentDidMount() {
    const { clearWorkspacesModel } = this.props;
    clearWorkspacesModel();
  }
  render() {
    const { form, workspacesModel } = this.props;
    const { data, loading } = workspacesModel;

    return (
      <LayoutBasic>
        {loading && <Spiner size="large" align="hover" />}
        {!data ? (
          <Form onSubmit={this.handleSubmit}>
            <PersonInfoForm form={form}></PersonInfoForm>
            <Button htmlType="submit">Next</Button>
          </Form>
        ) : (
          <Form onSubmit={this.handleSubmit}>
            <Button htmlType="submit">Submit</Button>
          </Form>
        )}
      </LayoutBasic>
    );
  }
  handleSubmit = e => {
    e.preventDefault();
    const { form, addWorkspacesModel, workspacesModel } = this.props;
    const { data } = workspacesModel;

    form.validateFieldsAndScroll((err, values: IWorkspaceValues) => {
      if (!err) {
        console.log(values);
        let model: IWorkspaceModelTo = { application: { ...values } };
        if (data) {
          const { id, ...rest } = data;
          model = {
            application: { ...rest.application },
            workspace: { domain: values.domain, name: values.name },
            zelos: { subdomain: values.subdomain, email: values.email, password: values.password }
          };
        }
        addWorkspacesModel(model);
      }
    });
  };
}
export default communicationApplication.injector(Form.create()(ApplicationPage));
