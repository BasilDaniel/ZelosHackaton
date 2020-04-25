import React from 'react';
import { Button, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { AntdFormHelper } from '@axmit/antd-helpers';
import { LayoutBasic } from 'common/components/LayoutBasic';
import { Spiner } from 'common/components/Spiner';
import { ButtonWrapper } from 'common/components/ButtonWrapper';
import { PersonInfoForm } from './PersonInfoForm';
import { communicationApplication, IApplicationConnectedProps } from './Application.communication';
import { IWorkspaceModelTo, IWorkspaceValues } from './Application.models';
import { WorkspaceInfoForm } from './WorkspaceInfoForm';

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
            <ButtonWrapper align="right">
              <Button htmlType="submit" type="primary">
                Next
              </Button>
            </ButtonWrapper>
          </Form>
        ) : (
          <Form onSubmit={this.handleSubmit}>
            <WorkspaceInfoForm form={form} />
            <ButtonWrapper align="right">
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </ButtonWrapper>
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
            workspace: { domain: values.domain, workspaceName: values.workspaceName },
            zelos: { subdomain: values.subdomain, zelosEmail: values.zelosEmail, password: values.password }
          };
        }
        addWorkspacesModel(model);
      }
    });
  };
}
export default communicationApplication.injector(
  Form.create({
    mapPropsToFields(props: AllProps) {
      const { workspacesModel } = props;
      const { params, errors } = workspacesModel;
      const data = errors && errors.data;
      let value = {};
      if (params) {
        value = {
          ...params.application,
          ...params.workspace,
          ...params.zelos
        };
      }

      return AntdFormHelper.mapValidationToFields(value, data);
    }
  })(ApplicationPage)
);
