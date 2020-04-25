import React from 'react';
import commonImage from 'app/assets/images/commonImage.jpg';
import { Col, Row } from 'antd';

interface IComponentProps {
  imageSrc?: string;
}

export class LayoutBasic extends React.Component<IComponentProps> {
  render() {
    const { children, imageSrc } = this.props;
    return (
      <Row type="flex" justify="center">
        <Col md={12} xs={24}>
          <img src={imageSrc ? imageSrc : commonImage} alt="About US" style={{ maxWidth: '100%', height: 'auto' }} />
        </Col>
        <Col md={12} xs={24}>
          {children}
        </Col>
      </Row>
    );
  }
}
