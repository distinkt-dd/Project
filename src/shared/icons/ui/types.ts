import type { SVGProps } from 'react';

export type IconName =
  | 'arrowLeftCircleM'
  | 'arrowLeftCircleS'
  | 'arrowNortheast'
  | 'arrowNortheastBold'
  | 'arrowRight'
  | 'burgerM'
  | 'burgerS'
  | 'check'
  | 'closeCircle'
  | 'close'
  | 'downM'
  | 'downS'
  | 'editM'
  | 'editS'
  | 'eyeMSlash'
  | 'eyeM'
  | 'eyeS'
  | 'fullBrightness'
  | 'grid'
  | 'leftM'
  | 'leftS'
  | 'like'
  | 'minus'
  | 'moon'
  | 'notifications'
  | 'plus'
  | 'rightM'
  | 'rightS'
  | 'search'
  | 'trashM'
  | 'trashS'
  | 'upM'
  | 'upS'
  | 'gmail'
  | 'telegram';

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  color?: string;
}
