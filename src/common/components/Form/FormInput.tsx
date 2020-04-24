import React from 'react';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import { Input } from 'antd';

interface IComponentProps {
  form?: WrappedFormUtils;
  decoratorName?: string;
  value?: string | number | string[];
  initialValue?: string | string[];
  label?: string;
  inputType?: 'text' | 'email' | 'password' | 'radio' | 'checkbox' | 'url' | 'tel' | 'number';
  required?: boolean;
  placeholder?: string;
  message?: string;
  validatorMessage?: string;
  transform?: <V, R>(value: V) => R;
  pattern?: RegExp;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  colon?: boolean;
  allowClear?: boolean;
  className?: string;
  validator?: (rule: any, value: any, callback: any, source?: any, options?: any) => any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

class FormInput extends React.Component<IComponentProps> {
  render() {
    const {
      form,
      label,
      decoratorName,
      value,
      initialValue,
      inputType = 'text',
      required = false,
      placeholder,
      message = 'Field is required',
      validatorMessage = '',
      validator = () => true,
      pattern,
      transform,
      prefix,
      suffix,
      children,
      colon,
      allowClear,
      className,
      onChange,
      disabled
    } = this.props;
    const validation = { type: inputType, message: validatorMessage };
    return form && decoratorName ? (
      <Form.Item colon={colon} label={label} className={`form-input ${className || ''}`}>
        {form.getFieldDecorator(decoratorName, {
          initialValue: initialValue,
          rules:
            inputType === 'email'
              ? [{ required, message }, validation, { validator, pattern, transform }]
              : [
                  { required, message },
                  { validator, transform }
                ]
        })(
          children ? (
            children
          ) : (
            <Input
              placeholder={placeholder}
              type={inputType}
              prefix={prefix}
              suffix={suffix}
              allowClear={allowClear}
              onChange={onChange}
              disabled={disabled}
            />
          )
        )}
      </Form.Item>
    ) : (
      <Form.Item colon={colon} label={label} className={`form-input ${className || ''}`}>
        {children ? (
          children
        ) : (
          <Input
            value={value}
            placeholder={placeholder}
            type={inputType}
            prefix={prefix}
            suffix={suffix}
            allowClear={allowClear}
            onChange={onChange}
            disabled={disabled}
          />
        )}
      </Form.Item>
    );
  }
}
export default FormInput;
