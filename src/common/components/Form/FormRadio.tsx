import React from 'react';
import { Radio } from 'antd';
import { RadioGroupProps } from 'antd/lib/radio';

interface IComponentProps extends RadioGroupProps {
  radioButtons: { value: string; label?: string; type?: 'text'; disabled?: boolean }[];
  type?: 'badges' | 'dots' | 'badges-connected';
  color?: 'black' | 'green';
}

class FormRadio extends React.Component<IComponentProps> {
  render() {
    const { radioButtons, type = 'badges', color = 'green', ...rest } = this.props;
    const className = `form-radio form-radio_${type} form-radio_${color}`;
    return (
      <Radio.Group className={className} {...rest}>
        {radioButtons.map(item => {
          if (item.type === 'text') {
            return <p key={item.value}>{item.value}</p>;
          }
          return (
            <Radio.Button
              key={item.value}
              value={item.value}
              className={item.disabled ? 'disabled' : ''}
              disabled={item.disabled}
            >
              {item.label}
            </Radio.Button>
          );
        })}
      </Radio.Group>
    );
  }
}
export default FormRadio;
