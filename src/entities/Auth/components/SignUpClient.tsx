import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form } from 'antd';
import { AntdFormHelper } from '@axmit/antd-helpers';
import moment from 'moment';
import Button from 'common/components/Button';
import FormInput from 'common/components/Form/FormInput';
import { IAuthConnectedProps, communicationAuth } from 'entities/Auth/Auth.communication';
import { ISignUpModel } from 'entities/Auth/Auth.models';

type AllProps = FormComponentProps & IAuthConnectedProps;

class SignUpClient extends React.Component<AllProps> {
  render() {
    const { form } = this.props;

    return (
      <Form className="signup" onSubmit={this.handleSubmit}>
        <Button type="back" back />
        <h1>A better path to success is a few steps away.</h1>
        <p>With Progrecity, you can shop, save, and earn money for education while supporting local businesses.</p>
        <FormInput form={form} decoratorName="firstName" label="First Name" required />
        <FormInput form={form} decoratorName="lastName" label="Last Name" required />
        <FormInput form={form} decoratorName="email" label="Email" inputType="email" required validatorMessage="Invalid email" />
        <FormInput form={form} decoratorName="password" label="Create a Password" inputType="password" required />
        <div className="signup-button">
          <Button type="success" size="xl" HTMLType="submit">
            Sign Up
          </Button>
        </div>
      </Form>
    );
  }
  ageValidate = (_rule, _value, _callback) => {
    const { form } = this.props;
    const { getFieldValue } = form;
    const date = getFieldValue('birthday');

    const userDate = moment(new Date(date));
    const currentDate = moment(new Date());
    const duration = moment.duration(currentDate.diff(userDate));
    const age = Math.floor(duration.asYears());

    if (age < 18) {
      _callback('You must be 18 or over');
    }
    _callback();
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, addAuthRegistration } = this.props;
    form.validateFieldsAndScroll((err, values: ISignUpModel) => {
      if (!err) {
        addAuthRegistration({ ...values });
      }
    });
  };
}

export default communicationAuth.injector(
  Form.create({
    mapPropsToFields(props: AllProps) {
      const { authRegistration } = props;
      const { params, errors } = authRegistration;
      const data = errors && errors.data;
      return AntdFormHelper.mapValidationToFields(params, data);
    }
  })(SignUpClient)
);
