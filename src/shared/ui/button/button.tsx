import styles from './Button.module.css';
import { Icon } from '@shared/icons';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'search';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  children,
  ...props
}) => {
  const buttonClasses = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={buttonClasses} {...props}>
      {children}
      {variant === 'tertiary' && <Icon name="arrowNortheast" />}
      {variant === 'search' && <Icon name="search" />}
    </button>
  );
};
