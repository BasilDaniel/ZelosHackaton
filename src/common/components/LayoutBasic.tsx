import React from 'react';
import { Col, Row } from 'antd';
import commonImage from '../../app/assets/images/commonImage.jpg';

interface IComponentProps {
  imageSrc?: string;
}

export class LayoutBasic extends React.Component<IComponentProps> {
  render() {
    const { children } = this.props;
    return (
      <Row type="flex" justify="center" className="layout-basic">
        <Col md={12} xs={24}>
          <div className="layout-basic__image">
            <img src={commonImage} alt="image" />
          </div>
        </Col>
        <Col md={12} xs={24}>
          {children}
        </Col>
      </Row>
    );
  }
}
