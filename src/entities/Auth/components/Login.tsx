import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Button, Card, Row } from 'antd';
import { AntdFormHelper } from '@axmit/antd-helpers';
import FormInput from 'common/components/Form/FormInput';
import { ButtonWrapper } from 'common/components/ButtonWrapper';
import { IAuthConnectedProps, communicationAuth } from 'entities/Auth/Auth.communication';
import { ILoginModel } from 'entities/Auth/Auth.models';

type AllProps = FormComponentProps & IAuthConnectedProps;

class Login extends React.Component<AllProps> {
  render() {
    const { form } = this.props;

    return (
      <Row type="flex" justify="center">
        <Card className="application-card">
          <Form className="login" onSubmit={this.handleSubmit}>
            <h1>Log in</h1>
            <FormInput form={form} decoratorName="email" label="Email" inputType="email" required />
            <FormInput form={form} decoratorName="password" label="Password" inputType="password" required />
            <ButtonWrapper align="center">
              <Button htmlType="submit" type="primary">
                Log in
              </Button>
            </ButtonWrapper>
          </Form>
        </Card>
      </Row>
    );
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, addAuthModel } = this.props;
    form.validateFieldsAndScroll((err, values: ILoginModel) => {
      if (!err) {
        addAuthModel(values);
      }
    });
  };
}

export default communicationAuth.injector(
  Form.create({
    mapPropsToFields(props: AllProps) {
      const { authModel } = props;
      const { params, errors } = authModel;
      const data = errors && errors.data;

      return AntdFormHelper.mapValidationToFields(params, data);
    }
  })(Login)
);
