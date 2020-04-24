import React from 'react';
import { Input } from 'antd';

interface IComponentProps {
  onChange?: (value?: number | null | string) => void;
  value?: number;
  allowClear?: boolean;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
}

class FormNumber extends React.Component<IComponentProps> {
  render() {
    const { value, allowClear, prefix, suffix, placeholder } = this.props;
    return (
      <Input
        onChange={this.onChange}
        value={value}
        allowClear={allowClear}
        prefix={prefix}
        suffix={suffix}
        placeholder={placeholder}
      />
    );
  }
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { onChange } = this.props;
    let value: undefined | null | number | string = undefined;
    if (isNaN(Number(e.target.value))) {
      value = e.target.value;
    }
    if (e.target.value === '') {
      value = null;
    }
    if (e.target.value !== '' && !isNaN(Number(e.target.value))) {
      value = e.target.value;
    }
    if (onChange) {
      onChange(value);
    }
  };
}
export default FormNumber;
