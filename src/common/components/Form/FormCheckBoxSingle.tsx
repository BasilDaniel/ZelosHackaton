import React from 'react';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface IComponentProps {
  onChange?: (value: boolean) => void;
  type?: 'badges' | 'box';
  value?: boolean;
  label?: string;
}

class FormCheckBoxSingle extends React.Component<IComponentProps> {
  render() {
    const { type = 'badges', value, label } = this.props;
    const className = `form-checkbox-single form-checkbox-single_${type}`;
    return (
      <Checkbox className={className} onChange={this.onChange} checked={value}>
        {label}
      </Checkbox>
    );
  }
  onChange = (e: CheckboxChangeEvent) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(e.target.checked);
    }
  };
}
export default FormCheckBoxSingle;
