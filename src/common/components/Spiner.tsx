import React, { FC } from 'react';
import { Spin } from 'antd';

interface IComponentProps {
  size?: 'small' | 'large';
  align?: 'center' | 'top' | 'hover';
}

export const Spiner: FC<IComponentProps> = props => {
  const { size, align } = props;
  const className = !align ? 'spiner' : `spiner spiner_${align}`;
  return (
    <div className={className}>
      <Spin size={size} />
    </div>
  );
};
