import styles from './Button.module.css';
import { Icon } from '@shared/icons';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'search' | 'back';
type ButtonType = 'button' | 'submit';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  type?: ButtonType;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  type = 'button',
  className,
  children,
  ...props
}) => {
  const buttonClasses = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={buttonClasses} {...props} type={type}>
      {variant === 'back' && <Icon name="arrowLeftCircleS" />}
      {children}
      {variant === 'tertiary' && <Icon name="arrowNortheast" />}
      {variant === 'search' && <Icon name="search" />}
    </button>
  );
};
