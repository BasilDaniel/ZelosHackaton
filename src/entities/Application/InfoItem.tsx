import React from 'react';

interface IComponentProps {
  fieldName: string;
  fieldValue: string;
}

export class InfoItem extends React.Component<IComponentProps> {
  render() {
    const { fieldName, fieldValue } = this.props;
    return (
      <div className="info-item">
        <div className="info-item__title">{fieldName}</div>
        <div className="info-item__text">{fieldValue}</div>
      </div>
    );
  }
}
