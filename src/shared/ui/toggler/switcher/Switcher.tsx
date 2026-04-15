import React from 'react';
import styles from './Switcher.module.css';

export type ThemeType = 'day' | 'night';

export interface SwitcherProps {
  checked?: boolean;
  theme?: ThemeType;
  onChange: (checked: boolean) => void;
}

export const Switcher: React.FC<SwitcherProps> = ({
  checked = false,
  theme = 'day',
  onChange,
}) => {
  const handleChange = () => {
    onChange(!checked);
  };

  const switcherStyle = {
    '--current-bg':
      theme === 'day' ? 'var(--gradient-day)' : 'var(--gradient-night)',
  } as React.CSSProperties;

  return (
    <label className={styles.switcherLabel} style={switcherStyle}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className={styles.switcherCheckbox}
      />
      <span className={styles.switcherSlider} />
    </label>
  );
};
