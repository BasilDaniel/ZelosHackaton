import React from 'react';
import { Select } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import isEqual from 'lodash.isequal';
import { debounce, flatObjectHasUndefined } from 'common/helpers/common.helper';
import { Spiner } from 'common/components/Spiner';
import { IDictionaryResponse } from 'entities/Dictionary/Dictionary.models';

interface ISearchName {
  name?: string;
  limit?: number;
}
export interface ISearchParams {
  [key: string]: SelectValue | undefined;
}

interface IComponentState {
  value?: SelectValue;
  selectOptions?: IDictionaryResponse[];
  loading: boolean;
  searchParams?: ISearchParams;
}

interface IComponentProps extends SelectProps {
  selectOptions?: IDictionaryResponse[];
  showSearch?: boolean;
  searchTransport?: <P extends ISearchName>(params: P) => Promise<IDictionaryResponse[]>;
  searchParams?: ISearchParams;
  getSearchParams?: (params: ISearchParams) => void;
  paramName?: string;
}

class FormDictionarySelect extends React.Component<IComponentProps, IComponentState> {
  static getDerivedStateFromProps(props: IComponentProps, state: IComponentState) {
    if (state.value !== props.value && !props.selectOptions) {
      return { value: props.value, searchParams: props.searchParams };
    }
    if (state.value !== props.value && props.selectOptions) {
      return { value: props.value, selectOptions: props.selectOptions };
    }
    return null;
  }
  constructor(props: IComponentProps) {
    super(props);
    this.state = { value: props.value, selectOptions: props.selectOptions, loading: false };
  }
  componentDidUpdate(prevProps: IComponentProps) {
    const { value, getSearchParams, paramName = 'paramName', searchParams } = this.props;
    if (value && value !== prevProps.value && getSearchParams) {
      const searchParam = { [paramName]: value };
      getSearchParams({ ...searchParam });
    }
    const objectsAreEqual = isEqual(searchParams, prevProps.searchParams);
    if (!objectsAreEqual && searchParams) {
      this.onFetch();
    }
  }
  componentDidMount() {
    this.onFetch();
  }
  render() {
    const { showSearch, onChange } = this.props;
    const { selectOptions, value, loading } = this.state;
    return (
      <Select
        loading={loading}
        className="form-select"
        showSearch={showSearch}
        onSearch={this.onSearch}
        filterOption={false}
        onChange={onChange}
        value={value}
      >
        {loading ? (
          <Select.Option key="spin" value="spin">
            <Spiner size="small" />
          </Select.Option>
        ) : (
          selectOptions &&
          selectOptions.map(item => (
            <Select.Option key={item.value} value={item.value}>
              {item.label}
            </Select.Option>
          ))
        )}
      </Select>
    );
  }
  onSearch = (name?: string) => {
    const { searchTransport, searchParams } = this.props;
    const params = searchParams ? searchParams : {};
    if (searchTransport) {
      this.setState({ loading: true });

      debounce(
        () =>
          searchTransport({ name, ...params })
            .then(res => {
              this.setState({ selectOptions: res, loading: false });
            })
            .catch(() => this.setState({ selectOptions: [], loading: false })),
        1000
      );
    }
  };

  onFetch = () => {
    const { searchTransport, searchParams } = this.props;
    const params = searchParams ? searchParams : {};
    if (searchTransport && !flatObjectHasUndefined(params)) {
      this.setState({ loading: true });

      searchTransport({ ...params, limit: 20 })
        .then(res => {
          this.setState({ selectOptions: res, loading: false });
        })
        .catch(() => this.setState({ selectOptions: [], loading: false }));
    }
  };
}
export default FormDictionarySelect;
