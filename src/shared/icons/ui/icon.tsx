import React, { type SVGProps } from 'react';
import { type IconName, type IconProps } from './types';
import {
  ArrowLeftCircle,
  ArrowNortheast,
  ArrowNortheastBold,
  Burger,
  Check,
  CloseCircle,
  Close,
  Down,
  Edit,
  EyeSlash,
  Eye,
  FullBrightness,
  Grid,
  Left,
  Like,
  Minus,
  Moon,
  Notifications,
  Plus,
  Right,
  Search,
  Trash,
  Up,
} from '../assets';

const iconComponents: Record<IconName, React.FC<SVGProps<SVGSVGElement>>> = {
  arrowLeftCircle: ArrowLeftCircle,
  arrowNortheast: ArrowNortheast,
  arrowNortheastBold: ArrowNortheastBold,
  burger: Burger,
  check: Check,
  closeCircle: CloseCircle,
  close: Close,
  down: Down,
  edit: Edit,
  eyeSlash: EyeSlash,
  eye: Eye,
  fullBrightness: FullBrightness,
  grid: Grid,
  left: Left,
  like: Like,
  minus: Minus,
  moon: Moon,
  notifications: Notifications,
  plus: Plus,
  right: Right,
  search: Search,
  trash: Trash,
  up: Up,
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  ...props
}) => {
  const IconComponent = iconComponents[name];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent width={size} height={size} color={color} {...props} />;
};
