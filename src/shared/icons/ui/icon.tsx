import React, { type SVGProps } from 'react';
import { type IconName, type IconProps } from './types';
import {
  ArrowLeftCircleM,
  ArrowLeftCircleS,
  ArrowNortheastBold,
  ArrowNortheast,
  BurgerM,
  BurgerS,
  Check,
  CloseCircle,
  Close,
  DownM,
  DownS,
  EditM,
  EditS,
  EyeMSlash,
  EyeM,
  EyeS,
  FullBrightness,
  Grid,
  LeftM,
  LeftS,
  Like,
  Minus,
  Moon,
  Notifications,
  Plus,
  RightM,
  RightS,
  Search,
  TrashM,
  TrashS,
  UpM,
  UpS,
  Gmail,
  Telegram,
} from '../assets';

const iconComponents: Record<IconName, React.FC<SVGProps<SVGSVGElement>>> = {
  arrowLeftCircleM: ArrowLeftCircleM,
  arrowLeftCircleS: ArrowLeftCircleS,
  arrowNortheast: ArrowNortheast,
  arrowNortheastBold: ArrowNortheastBold,
  burgerM: BurgerM,
  burgerS: BurgerS,
  check: Check,
  closeCircle: CloseCircle,
  close: Close,
  downM: DownM,
  downS: DownS,
  editM: EditM,
  editS: EditS,
  eyeMSlash: EyeMSlash,
  eyeM: EyeM,
  eyeS: EyeS,
  fullBrightness: FullBrightness,
  grid: Grid,
  leftM: LeftM,
  leftS: LeftS,
  like: Like,
  minus: Minus,
  moon: Moon,
  notifications: Notifications,
  plus: Plus,
  rightM: RightM,
  rightS: RightS,
  search: Search,
  trashM: TrashM,
  trashS: TrashS,
  upM: UpM,
  upS: UpS,
  gmail: Gmail,
  telegram: Telegram,
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
