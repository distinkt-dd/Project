import { Button, Tag } from '@shared/ui';
import styles from './ProjectItem.module.css';

interface ProjectItemProps {
  id: number;
  name: string;
  image?: string;
  tags?: string[];
}

export const ProjectItem: React.FC<ProjectItemProps> = ({
  id,
  name,
  image,
  tags,
}: ProjectItemProps) => {
  return (
    <li className={styles.item} key={id}>
      <div className={styles.left}>
        <img src={image} alt="Проект" className={styles.image} />
        <span className={styles.name}>{name}</span>
      </div>
      <div className={styles.right}>
        {tags && tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag, i) => (
              <Tag key={i}>{tag}</Tag>
            ))}
          </div>
        )}
        <Button variant="tertiary" className={styles.button}>
          К проекту
        </Button>
      </div>
    </li>
  );
};
