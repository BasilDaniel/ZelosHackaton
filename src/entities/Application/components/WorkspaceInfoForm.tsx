import React, { FC } from 'react';
import { WrappedFormUtils } from 'antd/lib/form/Form';

import FormInput from 'common/components/Form/FormInput';

interface IComponentProps {
  form: WrappedFormUtils;
}

export const WorkspaceInfoForm: FC<IComponentProps> = props => {
  const { form } = props;
  return (
    <>
      <h2>Workspace settings</h2>
      <FormInput form={form} decoratorName="domain" label="Choose a domain for your workspace" required suffix=".zelos.help" />
      <FormInput form={form} decoratorName="workspaceName" label="Name your workspace" required />
      <h2>Link your Zelos account</h2>
      <FormInput form={form} decoratorName="subdomain" label="Your workspace URL" required suffix=".zelos.space" />
      <FormInput
        form={form}
        decoratorName="zelosEmail"
        label="Zelos username"
        inputType="email"
        required
        validatorMessage="Invalid email"
      />
      <FormInput form={form} decoratorName="password" label="Zelos password" inputType="password" required />
    </>
  );
};
