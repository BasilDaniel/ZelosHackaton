import React, { FC } from 'react';

interface IComponentProps {
  align?: 'left' | 'center' | 'right';
}

export const ButtonWrapper: FC<IComponentProps> = props => {
  const { children, align = 'center' } = props;
  return (
    <div className={`button-wrapper button-wrapper_${align}`}>
      <div>{children}</div>
    </div>
  );
};
