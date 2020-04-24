import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import { Spiner } from 'common/components/Spiner';
import Button from 'common/components/Button';

interface IComponentProps extends SelectProps<string> {
  selectOptions?: { value: string; label: string; labelInfo?: string }[];
  onChange?: (value: string) => void;
  loading?: boolean;
  showSearch?: boolean;
  onSearch?: (value: string) => void;
  filterOption?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

class FormSelect extends React.Component<IComponentProps> {
  render() {
    const {
      onChange,
      selectOptions,
      value,
      loading,
      showSearch,
      onSearch,
      filterOption = false,
      defaultValue,
      allowClear,
      placeholder
    } = this.props;
    return (
      <div className="form-select">
        {allowClear && value && <Button type="cross" HTMLType="button" />}
        <Select
          filterOption={filterOption}
          onChange={onChange}
          value={value}
          loading={loading}
          showSearch={showSearch}
          onSearch={onSearch}
          defaultValue={defaultValue}
          allowClear
          placeholder={placeholder}
          getPopupContainer={(triggerNode: HTMLElement) => triggerNode}
        >
          {loading ? (
            <Select.Option key="spin" value="spin">
              <Spiner size="small" />
            </Select.Option>
          ) : (
            selectOptions &&
            selectOptions.map(item => (
              <Select.Option key={item.value} value={item.value}>
                {item.labelInfo ? `${item.label} - ${item.labelInfo}` : item.label}
              </Select.Option>
            ))
          )}
        </Select>
      </div>
    );
  }
}
export default FormSelect;
