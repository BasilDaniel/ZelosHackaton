import React from 'react';

interface IComponentProps {
  fieldName: string;
  fieldValue: string;
  link?: boolean;
}

export class InfoItem extends React.Component<IComponentProps> {
  render() {
    const { fieldName, fieldValue, link } = this.props;
    return (
      <div className="info-item">
        <div className="info-item__title">{fieldName}</div>
        <div className="info-item__text">
          {link ? (
            <a href={fieldValue} target="_blank" rel="noopener noreferrer">
              {fieldValue}
            </a>
          ) : (
            fieldValue
          )}
        </div>
      </div>
    );
  }
}
