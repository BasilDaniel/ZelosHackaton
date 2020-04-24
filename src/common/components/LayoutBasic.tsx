import React from 'react';

export class LayoutBasic extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className="row-container">
        <div className="col">
          image
          {children}
        </div>
        <div className="col content">
          Content
          {children}
        </div>
      </div>
    );
  }
}
