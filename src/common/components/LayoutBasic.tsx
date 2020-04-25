import React from 'react';
import commonImage from 'app/assets/images/commonImage.jpg';

interface IComponentProps {
  imageSrc?: string;
}

export class LayoutBasic extends React.Component<IComponentProps> {
  render() {
    const { children, imageSrc } = this.props;
    return (
      <div className="row-container">
        <div className="col">
          <div className="image" style={{ backgroundImage: `url(${imageSrc ? imageSrc : commonImage})` }} />
        </div>
        <div className="col content">{children}</div>
      </div>
    );
  }
}
