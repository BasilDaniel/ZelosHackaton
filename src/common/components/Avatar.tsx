import React, { FC } from 'react';

interface IComponentProps {
  size?: 'small' | 'large' | 'relative' | 'relative-large';
  imageId?: string;
  shape?: 'square' | 'circle' | 'rounded';
}

export const Avatar: FC<IComponentProps> = props => {
  const { size = 'default', imageId, shape = 'circle' } = props;
  const className = `avatar avatar_${size} avatar_${shape}`;
  const imageUrl = imageId ? `/api/cdn/image/${imageId}` : undefined;
  return (
    <div className={className}>
      <img src={imageUrl} alt="avatar" />
    </div>
  );
};
