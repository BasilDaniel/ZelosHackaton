import React from 'react';
import { List } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { StoreBranch } from '@axmit/redux-communications';
import { ItemsNotFound } from 'common/components/ItemsNotFound';
import { Spiner } from 'common/components/Spiner';

interface IComponentProps<Model, Collection extends { data: Model[]; meta: { count?: number } }> {
  elementId?: string;
  filters?: any;
  notFoundLabel?: string;
  getCollectionOnStart?: boolean;
}

interface IComponentState {
  pageIndex: number;
}

export interface IBaseFilterModel {
  limit: number;
  offset: number;
}

abstract class InfiniteListComponent<
  Collection extends { data: Model[]; meta: { count?: number } },
  Model,
  IProps,
  Params = any
> extends React.PureComponent<IComponentProps<Model, Collection> & IProps, IComponentState> {
  constructor(props: IComponentProps<Model, Collection> & IProps) {
    super(props);
    this.state = { pageIndex: 0 };
  }
  async componentDidMount() {
    const { getCollectionOnStart = true } = this.props;
    await this.clearCollection();
    if (getCollectionOnStart) {
      this.loadData();
    }
  }

  async componentDidUpdate(prevProps: Readonly<IComponentProps<Model, Collection> & IProps>) {
    if (JSON.stringify(prevProps.filters) !== JSON.stringify(this.props.filters)) {
      await this.clearCollection();
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ pageIndex: 0 }, this.loadData);
    }
  }

  render() {
    const { elementId = 'root', notFoundLabel } = this.props;
    const collection = this.getCollection();
    const { data: collectionData, loading } = collection;
    const items = collectionData?.data || [];
    const count = collectionData?.meta.count || 0;
    const hasMore = !loading && items.length < count;

    return (
      <InfiniteScroll
        pageStart={1}
        loadMore={() => this.loadData()}
        hasMore={!loading && hasMore}
        useWindow={false}
        getScrollParent={() => document.getElementById(elementId)}
      >
        {collectionData && (
          <List
            itemLayout="vertical"
            dataSource={items}
            renderItem={this.renderListItem}
            locale={{ emptyText: loading ? <div /> : <ItemsNotFound label={notFoundLabel} /> }}
          />
        )}
        {loading && <Spiner size="large" align="top" />}
      </InfiniteScroll>
    );
  }

  loadData = () => {
    const collection = this.getCollection();
    const { pageIndex } = this.state;
    const pageSize = 10;
    const { data: collectionData, loading } = collection;
    const count = collectionData?.meta.count || 0;
    const hasMore = !loading && (!count || count > pageSize * pageIndex);

    if (hasMore) {
      const params: IBaseFilterModel = {
        limit: pageSize,
        offset: pageSize * pageIndex
      };

      this.loadCollection(params);
      this.setState(() => ({ pageIndex: pageIndex + 1 }));
    }
  };

  abstract clearCollection: () => Promise<void>;
  abstract getCollection: () => StoreBranch<Collection, Params>;
  abstract loadCollection: (params: IBaseFilterModel) => void;
  abstract renderListItem: (model: Model) => JSX.Element;
}

export const InfiniteList = InfiniteListComponent;
