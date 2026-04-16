import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  errorText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
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
      autoComplete = 'off',
      value: externalValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [internalValue, setInternalValue] = useState(() =>
      externalValue !== undefined ? externalValue : ''
    );

    const generatedId = React.useId();
    const inputId = id || generatedId;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange?.(e);
    };

    useImperativeHandle(ref, () => inputRef.current!);

    const hasValue = useMemo(
      () => internalValue !== '' && internalValue !== undefined,
      [internalValue]
    );

    const hasPlaceholder = useMemo(
      () => placeholder !== undefined && placeholder !== '',
      [placeholder]
    );

    const inputClassName = useMemo(
      () =>
        [
          styles.input,
          errorText ? styles.withError : '',
          leftIcon ? styles.withLeftIcon : '',
          rightIcon ? styles.withRightIcon : '',
          hasValue ? styles.withValue : '',
          hasPlaceholder ? styles.withPlaceholder : '',
        ]
          .filter(Boolean)
          .join(' '),
      [errorText, leftIcon, rightIcon, hasValue, hasPlaceholder]
    );

    return (
      <div className={styles.container}>
        <div className={styles.inputWrapper}>
          {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
          <input
            id={inputId}
            className={inputClassName}
            ref={inputRef}
            value={internalValue}
            onChange={handleChange}
            autoComplete={autoComplete}
            placeholder={placeholder}
            {...props}
          />
          {labelText && (
            <label htmlFor={inputId} className={styles.label}>
              {labelText}
            </label>
          )}
          {rightIcon && (
            <span className={styles.rightIcon} role="button" tabIndex={0}>
              {rightIcon}
            </span>
          )}
        </div>
        {errorText && <div className={styles.errorText}>{errorText}</div>}
      </div>
    );
  }
);
