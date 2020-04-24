import React from 'react';
import { Checkbox } from 'antd';
import { CheckboxOptionType } from 'antd/lib/checkbox';
import FormCheckBoxSingle from 'common/components/Form/FormCheckBoxSingle';

interface IComponentState {
  isCheckedAll: boolean;
  checkAllContoller: boolean;
}

interface IComponentProps {
  checkboxButtons: CheckboxOptionType[];
  onChange?: (value: string[]) => void;
  type?: 'badges' | 'box';
  value?: string[];
  isAbleCheckAll?: boolean;
}

class FormCheckBox extends React.Component<IComponentProps, IComponentState> {
  constructor(props: IComponentProps) {
    super(props);
    const checkAll = props.checkboxButtons.length === props.value?.length ? true : false;
    this.state = { isCheckedAll: checkAll, checkAllContoller: checkAll };
  }
  componentDidUpdate(prevProps: IComponentProps, prevState: IComponentState) {
    const { isCheckedAll, checkAllContoller } = this.state;
    if (prevState.isCheckedAll !== isCheckedAll && prevProps.isAbleCheckAll && !checkAllContoller) {
      if (isCheckedAll) {
        const checkboxValues = prevProps.checkboxButtons.map(item => item.value);
        this.onChange([...checkboxValues]);
      } else {
        this.onChange([]);
      }
    }
  }
  render() {
    const { checkboxButtons, type = 'badges', value, isAbleCheckAll } = this.props;
    const className = `form-checkbox form-checkbox_${type}`;
    const { isCheckedAll } = this.state;
    return (
      <>
        {isAbleCheckAll && <FormCheckBoxSingle type="box" label="Choose All" onChange={this.onCheckAll} value={isCheckedAll} />}
        <Checkbox.Group className={className} options={checkboxButtons} onChange={this.onChange} value={value} />
      </>
    );
  }
  onChange = value => {
    const { onChange, checkboxButtons } = this.props;
    if (onChange) {
      const checkAll = checkboxButtons.length === value?.length ? true : false;
      onChange(value);
      this.setState({ isCheckedAll: checkAll, checkAllContoller: true });
    }
  };
  onCheckAll = (value: boolean) => {
    this.setState({ isCheckedAll: value, checkAllContoller: false });
  };
}
export default FormCheckBox;
