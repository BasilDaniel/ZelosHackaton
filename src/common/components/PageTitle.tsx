import React, { FC } from 'react';

interface IComponentProps {
  title: string;
}

export const PageTitle: FC<IComponentProps> = props => {
  const { title } = props;
  return (
    <div className="page-title">
      <h1>{title}</h1>
    </div>
  );
};
