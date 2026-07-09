import type React from 'react';
import styles from './Tag.module.css';

type tagBgColor = 'blue' | 'green' | 'purple' | 'pink' | 'neutral';
type tagTextColor = 'black' | 'white';

interface TagProps {
  bgColor?: tagBgColor;
  textColor?: tagTextColor;
  children: React.ReactNode;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  bgColor = 'neutral',
  textColor = 'black',
  children,
  className,
}) => {
  const tagClasses = [styles.tag, styles[bgColor], styles[textColor], className]
    .filter(Boolean)
    .join(' ');

  return <span className={tagClasses}>{children}</span>;
};
