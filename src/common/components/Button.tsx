import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface IComponentProps {
  type?: 'success' | 'success-invert' | 'back' | 'cross' | 'plus' | 'danger-invert';
  size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'responsive';
  onClick?: () => void;
  HTMLType?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  back?: boolean;
  align?: 'center';
}

type AllProps = IComponentProps & RouteComponentProps;

const Button: React.FC<AllProps> = props => {
  const {
    children,
    type = 'success',
    size = 'm',
    history,
    onClick,
    HTMLType = 'button',
    disabled = false,
    back = false,
    align
  } = props;
  const disabledClass = disabled ? 'button_disabled' : '';
  const alignClass = align ? `button_${align}` : '';

  return back ? (
    <button
      type={HTMLType}
      className={`button button__${type} button__size--${size} ${disabledClass} ${alignClass}`}
      onClick={
        onClick
          ? e => {
              e.stopPropagation();
              onClick();
            }
          : history.goBack
      }
      disabled={disabled}
    >
      {children}
    </button>
  ) : (
    <button
      type={HTMLType}
      className={`button button__${type} button__size--${size} ${disabledClass} ${alignClass}`}
      onClick={e => {
        e.stopPropagation();
        if (onClick) {
          onClick();
        }
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default withRouter(Button);
