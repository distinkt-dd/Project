import React from 'react';
import styles from './Radio.module.css';

export interface RadioProps {
  label: string;
  value: string;
  checked: boolean;
  name?: string;
  onChange: (value: string) => void;
  className?: string;
}

export const Radio: React.FC<RadioProps> = ({
  label,
  value,
  checked,
  name = 'radio',
  onChange,
  className,
}) => {
  return (
    <label className={[styles.radioLabel, className].filter(Boolean).join(' ')}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className={styles.radio}
      />
      <span className={styles.pseudoRadio} />
      <span className={styles.text}>{label}</span>
    </label>
  );
};
