import React from 'react';
import { Input } from 'antd';
import { debounce } from 'common/helpers/common.helper';
import Button from 'common/components/Button';

interface IComponentState {
  value: string;
}

interface IComponentProps {
  onChange?: (value: string) => void;
  inputType?: 'text' | 'email' | 'password' | 'radio' | 'checkbox' | 'url' | 'tel' | 'number';
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  allowClear?: boolean;
}

class FormInputDebounce extends React.Component<IComponentProps> {
  state = { value: undefined };
  render() {
    const { placeholder, inputType, prefix, suffix, allowClear } = this.props;
    const { value } = this.state;
    return (
      <div className="form-input-debounce">
        {allowClear && value && <Button type="cross" HTMLType="button" />}
        <Input
          value={value}
          placeholder={placeholder}
          type={inputType}
          prefix={prefix}
          suffix={suffix}
          allowClear={allowClear}
          onChange={this.onChange}
        />
      </div>
    );
  }
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    const value = e.target.value;
    this.setState({ value });
    if (onChange) {
      debounce(() => onChange(value), 1000);
    }
  };
}
export default FormInputDebounce;
