import React from 'react';

interface IComponentProps {
  label?: string;
}

type AllProps = IComponentProps;

export class ItemsNotFound extends React.PureComponent<AllProps> {
  render() {
    const { label } = this.props;

    return <span>{label || 'No data'}</span>;
  }
}
