import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form } from 'antd';
import { AntdFormHelper } from '@axmit/antd-helpers';
import { Link } from 'react-router-dom';
import Button from 'common/components/Button';
import FormInput from 'common/components/Form/FormInput';
import { ERoutes } from 'app/App';
import { IAuthConnectedProps, communicationAuth } from 'entities/Auth/Auth.communication';
import { ILoginModel } from 'entities/Auth/Auth.models';

type AllProps = FormComponentProps & IAuthConnectedProps;

class Login extends React.Component<AllProps> {
  render() {
    const { form } = this.props;

    return (
      <Form className="login" onSubmit={this.handleSubmit}>
        <h1>Log in</h1>
        <FormInput form={form} decoratorName="email" label="Email" inputType="email" required />
        <FormInput form={form} decoratorName="password" label="Password" inputType="password" required />
        <div className="login-button">
          <Button type="success" size="xl" HTMLType="submit">
            Log in
          </Button>
        </div>
        <p>
          Don’t have an account? <Link to={`/${ERoutes.SignUp}`}>Sign up</Link>
        </p>
      </Form>
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
