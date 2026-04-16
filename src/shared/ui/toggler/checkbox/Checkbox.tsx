import React from 'react';
import styles from './Checkbox.module.css';
import { Icon } from '@shared/icons';

export interface CheckboxProps {
  checked?: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <label htmlFor="checkbox" className={styles.checkboxLabel}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className={styles.checkbox}
        id="checkbox"
      />
      <span className={styles.pseudoCheckbox}>
        {checked && (
          <Icon name="check" color="#2C2C2E" className={styles.icon} />
        )}
      </span>
    </label>
  );
};
