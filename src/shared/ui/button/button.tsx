import React, { useCallback, useState } from 'react';
import styles from './Button.module.css';
import { Icon } from '@shared/icons';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  onMouseDown: externalOnMouseDown,
  onMouseUp: externalOnMouseUp,
  onMouseEnter: externalOnMouseEnter,
  onMouseLeave: externalOnMouseLeave,
  children,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const iconName = isActive
    ? 'arrowNortheast'
    : isHovered
      ? 'arrowNortheastBold'
      : 'arrowNortheast';

  const buttonClasses = [styles.button, styles[variant]]
    .filter(Boolean)
    .join(' ');

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setIsActive(true);
      externalOnMouseDown?.(event);
    },
    [externalOnMouseDown]
  );

  const handleMouseUp = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setIsActive(false);
      externalOnMouseUp?.(event);
    },
    [externalOnMouseUp]
  );

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(true);
      externalOnMouseEnter?.(event);
    },
    [externalOnMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(false);
      externalOnMouseLeave?.(event);
    },
    [externalOnMouseLeave]
  );

  return (
    <button
      className={buttonClasses}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
      {variant === 'tertiary' && <Icon name={iconName} />}
    </button>
  );
};
