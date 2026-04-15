import React from 'react';
import styles from './ThemeSwitcher.module.css';
import { Icon } from '@shared/icons';

export interface ThemeSwitcherProps {
  checked?: boolean;
  onChange: (checked: boolean) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  checked = false,
  onChange,
}) => {
  const handleChange = () => {
    onChange(!checked);
  };

  return (
    <label className={styles.themeSwitcherLabel}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className={styles.themeSwitcherCheckbox}
      />
      <span className={styles.themeSwitcherSlider}>
        <div className={styles.iconContainer}>
          <Icon
            name="moon"
            size={24}
            color={
              checked
                ? 'var(--neutral-secondary-color)'
                : 'var(--neutral-default-color)'
            }
          />
          <Icon
            name="fullBrightness"
            size={24}
            color={checked ? '#000000' : 'var(--neutral-secondary-color)'}
          />
        </div>
      </span>
    </label>
  );
};
