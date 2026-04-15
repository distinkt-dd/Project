import React from 'react';
import { Checkbox } from './checkbox/Checkbox';
import { Switcher } from './switcher/Switcher';
import { ThemeSwitcher } from './theme/ThemeSwitcher';

export type TogglerType = 'checkbox' | 'theme' | 'switch';

export interface TogglerProps {
  type?: TogglerType;
  checked?: boolean;
  onChange: (checked: boolean) => void;
}

export const Toggler: React.FC<TogglerProps> = ({
  type = 'checkbox',
  checked = false,
  onChange,
}) => {
  switch (type) {
    case 'checkbox':
      return <Checkbox checked={checked} onChange={onChange} />;
    case 'theme':
      return <ThemeSwitcher checked={checked} onChange={onChange} />;
    case 'switch':
      return <Switcher checked={checked} onChange={onChange} />;
  }
};
