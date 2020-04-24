import React from 'react';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { debounce } from 'common/helpers/common.helper';
import { dictionaryItemMap } from 'common/helpers/mappers.helper';
import FormInput from 'common/components/Form/FormInput';
import FormSelect from 'common/components/Form/FormSelect';
import { INameDictionary, IDictionaryResponse } from 'entities/Dictionary/Dictionary.models';

interface ISearchName {
  name?: string;
  limit?: number;
}

interface IComponetState {
  dictionaryLoading: boolean;
  dictionaryOptions?: IDictionaryResponse[];
}

interface IComponentProps {
  form?: WrappedFormUtils;
  dictionary?: INameDictionary;
  decoratorName?: string;
  searchTransport?: <P extends ISearchName>(params?: P) => Promise<IDictionaryResponse[]>;
  label?: string;
  onChange?: (value: string, dictionaryOptions: IDictionaryResponse[]) => void;
  value?: string;
  defaultValue?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

type AllProps = IComponentProps;

class FormDictionary extends React.Component<AllProps, IComponetState> {
  constructor(props: AllProps) {
    super(props);
    this.state = {
      dictionaryLoading: false,
      dictionaryOptions: undefined
    };
  }

  componentDidMount() {
    this.dictionaryFetch();
  }
  render() {
    const { form, dictionary, decoratorName, label, value, allowClear, placeholder } = this.props;
    const { dictionaryOptions, dictionaryLoading } = this.state;

    const dictionaryIndexInList =
      dictionary && dictionaryOptions && dictionaryOptions.findIndex(item => item.value === dictionary.id);
    const dictionaryOptionsItem = dictionaryItemMap(dictionary);
    if (dictionaryOptionsItem && dictionaryOptions && dictionary && dictionaryIndexInList && dictionaryIndexInList === -1) {
      dictionaryOptions.push(dictionaryOptionsItem);
    }

    return form && decoratorName ? (
      <FormInput form={form} decoratorName={decoratorName} label={label} colon={false} required>
        <FormSelect
          showSearch={true}
          onSearch={this.onDictionarySearch}
          filterOption={false}
          selectOptions={dictionaryOptions}
          onChange={this.onDictionaryChange}
          loading={dictionaryLoading}
          placeholder={placeholder}
        />
      </FormInput>
    ) : (
      <FormInput label={label} colon={false}>
        <FormSelect
          value={dictionaryLoading ? '' : value}
          showSearch={true}
          onSearch={this.onDictionarySearch}
          filterOption={false}
          selectOptions={dictionaryOptions}
          onChange={this.onDictionaryChange}
          loading={dictionaryLoading}
          allowClear={allowClear}
          placeholder={placeholder}
        />
      </FormInput>
    );
  }
  onDictionaryChange = (value: string) => {
    const { form, decoratorName, onChange } = this.props;
    const { dictionaryOptions } = this.state;
    if (form && decoratorName) {
      form.setFieldsValue({ [decoratorName]: value });
    }
    if (onChange && dictionaryOptions) {
      onChange(value, dictionaryOptions);
    }
  };

  dictionaryFetch = () => {
    this.setState({ dictionaryLoading: true });
    const { searchTransport, defaultValue, onChange, value } = this.props;

    if (searchTransport) {
      searchTransport()
        .then(res => {
          if (onChange && defaultValue && !value) {
            onChange(res[0].value, res);
          }
          this.setState({ dictionaryOptions: res, dictionaryLoading: false });
        })
        .catch(() => this.setState({ dictionaryOptions: [], dictionaryLoading: false }));
    }
  };
  onDictionarySearch = (name?: string) => {
    this.setState({ dictionaryLoading: true });
    const { searchTransport } = this.props;
    if (searchTransport) {
      debounce(
        () =>
          searchTransport({ name })
            .then(res => {
              this.setState({ dictionaryOptions: res, dictionaryLoading: false });
            })
            .catch(() => this.setState({ dictionaryOptions: [], dictionaryLoading: false })),
        1000
      );
    }
  };
}
export default FormDictionary;
