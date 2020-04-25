import React from 'react';
import { Col, Row } from 'antd';

interface IComponentProps {
  imageSrc?: string;
}

export class LayoutBasic extends React.Component<IComponentProps> {
  render() {
    const { children } = this.props;
    return (
      <Row type="flex" justify="center">
        <Col md={12} xs={24}>
          <div className="image" />
        </Col>
        <Col md={12} xs={24}>
          {children}
        </Col>
      </Row>
    );
  }
}
