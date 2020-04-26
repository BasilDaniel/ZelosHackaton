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
import { errorsApplicaionMapper } from 'common/helpers/errors.helper';

type AllProps = FormComponentProps & IApplicationConnectedProps & RouteComponentProps;

class ApplicationPage extends React.Component<AllProps> {
  componentDidMount() {
    const { clearWorkspacesAppModel } = this.props;
    clearWorkspacesAppModel();
  }
  render() {
    const { form, workspacesAppModel, workspacesWsZModel } = this.props;
    const { loading, errors } = workspacesAppModel;
    const { data, loading: wsZLoading } = workspacesWsZModel;
    let isNextStep = false;
    if (errors && errors.data && errors.data.errors) {
      isNextStep = !Object.keys(errors.data.errors).some(item => !!item.startsWith('application'));
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
        {(loading || wsZLoading) && <Spiner size="large" align="hover" />}
        {!isNextStep ? (
          <Form onSubmit={this.handleSubmit}>
            <PersonInfoForm form={form} />
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
    const { form, addWorkspacesAppModel, addWorkspacesWsZModel, workspacesAppModel } = this.props;
    const { params, errors } = workspacesAppModel;
    let isNextStep = false;
    if (errors && errors.data && errors.data.errors) {
      isNextStep = !Object.keys(errors.data.errors).some(item => !!item.startsWith('application'));
    }

    form.validateFieldsAndScroll((err, values: IWorkspaceValues) => {
      if (!err) {
        console.log(values);
        let model: IWorkspaceModelTo;
        if (isNextStep && params) {
          const { application } = params;
          model = {
            application: application,
            workspace: { domain: values.domain, name: values.workspaceName },
            zelos: { subdomain: values.subdomain, email: values.zelosEmail, password: values.password }
          };
        } else {
          model = { application: { ...values } };
        }
        if (isNextStep) {
          addWorkspacesWsZModel(model);
        } else {
          addWorkspacesAppModel(model);
        }
      }
    });
  };
}
export default communicationApplication.injector(
  withRouter(
    Form.create({
      mapPropsToFields(props: AllProps) {
        const { workspacesAppModel, workspacesWsZModel } = props;
        const { params: appParams, errors: appErrors } = workspacesAppModel;
        const { params: wsZParams, errors: wsZErrors } = workspacesWsZModel;
        let data;
        let value = {};
        let isNextStep = false;
        if (appErrors && appErrors.data && appErrors.data.errors) {
          isNextStep = !Object.keys(appErrors.data.errors).some(item => !!item.startsWith('application'));
        }
        if (appErrors && appErrors.data && !isNextStep) {
          const dataErrors = appErrors && errorsApplicaionMapper(appErrors.data.errors);
          data = { ...appErrors.data, errors: dataErrors };
        }
        if (wsZErrors && wsZErrors.data && isNextStep) {
          const dataErrors = wsZErrors && errorsApplicaionMapper(wsZErrors.data.errors);
          data = { ...wsZErrors.data, errors: dataErrors };
        }
        if (appParams && !isNextStep) {
          value = {
            ...appParams.workspace,
            ...appParams.zelos,
            ...appParams.application,
            workspaceName: appParams.workspace?.name,
            zelosEmail: appParams.zelos?.email
          };
        }
        if (wsZParams && isNextStep) {
          value = {
            ...wsZParams.workspace,
            ...wsZParams.zelos,
            ...wsZParams.application,
            workspaceName: wsZParams.workspace?.name,
            zelosEmail: wsZParams.zelos?.email
          };
        }

        return AntdFormHelper.mapValidationToFields(value, data);
      }
    })(ApplicationPage)
  )
);
