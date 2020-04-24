import React from 'react';
import { Row } from 'antd';

interface IComponentProps {}

interface IComponentState {
  hasError: boolean;
}

type AllProps = IComponentProps;

export class UIErrorHandler extends React.Component<AllProps, IComponentState> {
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  constructor(props: AllProps) {
    super(props);
    this.state = { hasError: false };
  }

  render() {
    const { hasError } = this.state;
    return !hasError ? (
      this.props.children
    ) : (
      <Row type="flex" justify="center">
        Errors
      </Row>
    );
  }
}
