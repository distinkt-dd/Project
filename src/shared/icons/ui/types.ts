import type { SVGProps } from 'react';

export type IconName =
  | 'arrowLeftCircle'
  | 'arrowNortheast'
  | 'arrowNortheastBold'
  | 'burger'
  | 'check'
  | 'closeCircle'
  | 'close'
  | 'down'
  | 'edit'
  | 'eyeSlash'
  | 'eye'
  | 'fullBrightness'
  | 'grid'
  | 'left'
  | 'like'
  | 'minus'
  | 'moon'
  | 'notifications'
  | 'plus'
  | 'right'
  | 'search'
  | 'trash'
  | 'up';

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  color?: string;
}
