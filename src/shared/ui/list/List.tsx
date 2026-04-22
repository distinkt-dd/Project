import React from 'react';
import styles from './List.module.css';

interface ListItem {
  id: string | number;
  text: string;
  url: string;
}

interface ListProps {
  title: string;
  items: ListItem[];
}

export const List: React.FC<ListProps> = ({ title, items }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={styles.listItem}>
            <a href={item.url} className={styles.link}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
