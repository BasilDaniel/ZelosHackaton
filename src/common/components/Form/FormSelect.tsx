import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

import Button from 'common/components/Button';

interface IComponentProps extends SelectProps<string> {
  selectOptions: string[];
  onChange?: (value: string) => void;
  loading?: boolean;
  showSearch?: boolean;
  onSearch?: (value: string) => void;
  allowClear?: boolean;
  placeholder?: string;
}

class FormSelect extends React.Component<IComponentProps> {
  render() {
    const { onChange, selectOptions, value, loading, showSearch, onSearch, defaultValue, allowClear, placeholder } = this.props;
    return (
      <div className="form-select">
        {allowClear && value && <Button type="cross" HTMLType="button" />}
        <Select
          optionFilterProp="children"
          onChange={onChange}
          value={value}
          loading={loading}
          showSearch={showSearch}
          onSearch={onSearch}
          defaultValue={defaultValue}
          allowClear
          placeholder={placeholder}
          getPopupContainer={(triggerNode: HTMLElement) => triggerNode}
          filterOption={(input, option) => {
            const item = option.props.children as string;
            return item.toLowerCase().indexOf(input.toLowerCase()) >= 0;
          }}
        >
          {selectOptions.map(item => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </div>
    );
  }
}
export default FormSelect;
