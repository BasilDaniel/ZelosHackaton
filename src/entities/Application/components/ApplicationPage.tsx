import React from 'react';
import { Button, Form } from 'antd';
import { AntdFormHelper } from '@axmit/antd-helpers';
import { FormComponentProps } from 'antd/lib/form';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { LayoutBasic } from 'common/components/LayoutBasic';
import { Spiner } from 'common/components/Spiner';
import { ButtonWrapper } from 'common/components/ButtonWrapper';
import { PersonInfoForm } from 'entities/Application/components/PersonInfoForm';
import { communicationApplication, IApplicationConnectedProps } from 'entities/Application/Application.communication';
import { WorkspaceInfoForm } from 'entities/Application/components/WorkspaceInfoForm';
import { IWorkspaceModelTo, IWorkspaceValues } from 'entities/Application/Application.models';
import { ThankYouMessage } from './ThankYouMessage';

type AllProps = FormComponentProps & IApplicationConnectedProps & RouteComponentProps;

class ApplicationPage extends React.Component<AllProps> {
  componentDidMount() {
    const { clearWorkspacesAppModel } = this.props;
    clearWorkspacesAppModel();
  }
  render() {
    const { form, workspacesAppModel } = this.props;
    const { data, loading, errors } = workspacesAppModel;
    let isNextStep = false;
    if (errors && errors.data && errors.data.errors) {
      isNextStep = !errors.data.errors.some(item => item.param === 'application');
    }
    if (data) {
      return (
        <LayoutBasic>
          <ThankYouMessage />
        </LayoutBasic>
      );
    }

    return (
      <LayoutBasic>
        {loading && <Spiner size="large" align="hover" />}
        {!isNextStep ? (
          <Form onSubmit={this.handleSubmit}>
            <PersonInfoForm form={form}></PersonInfoForm>
            <ButtonWrapper align="right">
              <Button className="button" onClick={this.goBack}>
                Back
              </Button>
              <Button htmlType="submit" type="primary">
                Next
              </Button>
            </ButtonWrapper>
          </Form>
        ) : (
          <Form onSubmit={this.handleSubmit}>
            <WorkspaceInfoForm form={form} />
            <ButtonWrapper align="right">
              <Button className="button" onClick={this.goBack}>
                Back
              </Button>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </ButtonWrapper>
          </Form>
        )}
      </LayoutBasic>
    );
  }

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, addWorkspacesModel, workspacesAppModel } = this.props;
    const { params } = workspacesAppModel;

    form.validateFieldsAndScroll((err, values: IWorkspaceValues) => {
      if (!err) {
        console.log(values);
        let model: IWorkspaceModelTo = { application: { ...values } };
        if (params) {
          const { application } = params;
          model = {
            application: application,
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
  withRouter(
    Form.create({
      mapPropsToFields(props: AllProps) {
        const { workspacesAppModel } = props;
        const { params, errors } = workspacesAppModel;
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
  )
);
