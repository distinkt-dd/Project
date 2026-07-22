import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useMemo,
} from 'react';
import styles from './input.module.css';

type InputType = 'text' | 'email' | 'password';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  errorText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  type?: InputType;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      labelText,
      placeholder,
      errorText,
      leftIcon,
      rightIcon,
      onRightIconClick,
      type = 'text',
      autoComplete = 'off',
      value: externalValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [internalValue, setInternalValue] = useState<string>(
      externalValue != null ? String(externalValue) : ''
    );

    const computedValue = useMemo(() => {
      if (externalValue !== undefined) {
        return String(externalValue);
      }
      return internalValue;
    }, [externalValue, internalValue]);

    const generatedId = React.useId();
    const inputId = id || generatedId;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange?.(e);
    };

    useImperativeHandle(ref, () => inputRef.current!, []);

    const hasValue = internalValue !== '' && internalValue !== undefined;
    const hasPlaceholder = placeholder !== undefined && placeholder !== '';

    const inputClassName = [
      styles.input,
      errorText ? styles.withError : '',
      leftIcon ? styles.withLeftIcon : '',
      rightIcon ? styles.withRightIcon : '',
      hasValue ? styles.withValue : '',
      hasPlaceholder ? styles.withPlaceholder : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.container}>
        <div className={styles.inputWrapper}>
          {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
          <input
            id={inputId}
            className={inputClassName}
            ref={(el) => {
              inputRef.current = el;
              if (typeof ref === 'function') ref(el);
              else if (ref) ref.current = el;
            }}
            value={computedValue}
            onChange={handleChange}
            autoComplete={autoComplete}
            placeholder={placeholder}
            type={type}
            {...props}
          />
          {labelText && (
            <label htmlFor={inputId} className={styles.label}>
              {labelText}
            </label>
          )}
          {rightIcon && (
            <span
              className={styles.rightIcon}
              role="button"
              tabIndex={0}
              onClick={onRightIconClick}
            >
              {rightIcon}
            </span>
          )}
        </div>
        {errorText && <div className={styles.errorText}>{errorText}</div>}
      </div>
    );
  }
);
