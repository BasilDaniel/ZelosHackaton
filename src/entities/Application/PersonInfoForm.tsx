import React, { FC } from 'react';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import FormInput from 'common/components/Form/FormInput';
import { urlValidate } from 'common/helpers/validation.helper';
import FormSelect from 'common/components/Form/FormSelect';
import { countryList } from './Countries';

interface IComponentProps {
  form: WrappedFormUtils;
}

export const PersonInfoForm: FC<IComponentProps> = props => {
  const { form } = props;
  return (
    <>
      <FormInput form={form} decoratorName="organization" label="What is your organisation called?" required />
      <FormInput form={form} decoratorName="country" label="Where are you located?" required>
        <FormSelect selectOptions={countryList} showSearch></FormSelect>
      </FormInput>
      <FormInput form={form} decoratorName="name" label="Your name" required />
      <FormInput form={form} decoratorName="phone" label="Phone number" required />
      <FormInput
        form={form}
        decoratorName="email"
        label="Email address"
        inputType="email"
        required
        validatorMessage="Invalid email"
      />
      <FormInput form={form} decoratorName="website" label="Website" required validator={urlValidate} />
      <FormInput form={form} decoratorName="details" label="Please tell us a bit about your cause" required>
        <TextArea rows={4} />
      </FormInput>
    </>
  );
};
