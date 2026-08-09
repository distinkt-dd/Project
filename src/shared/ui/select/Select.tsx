import React, { forwardRef, useId, useState } from 'react';
import { DownM, UpM } from '@shared/icons';
import styles from './Select.module.css';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'children'
> {
  labelText?: string;
  options: Option[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ id, labelText, options, className, onChange, onBlur, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id || generatedId;
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseDown = () => {
      setIsOpen((prev) => !prev);
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setIsOpen(false);
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsOpen(false);
      onBlur?.(e);
    };

    return (
      <div className={styles.container}>
        <select
          id={selectId}
          ref={ref}
          className={[styles.select, className].filter(Boolean).join(' ')}
          aria-label={labelText}
          defaultValue=""
          onMouseDown={handleMouseDown}
          onChange={handleChange}
          onBlur={handleBlur}
          {...props}
        >
          {labelText && (
            <option value="" disabled hidden>
              {labelText}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {isOpen ? (
          <UpM className={styles.arrow} aria-hidden="true" />
        ) : (
          <DownM className={styles.arrow} aria-hidden="true" />
        )}
      </div>
    );
  }
);
