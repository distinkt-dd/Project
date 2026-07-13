import { ProjectsList } from '@widgets/projectsList';
import styles from './WeeklyProjects.module.css';
import { Button } from '@shared/ui';
import mock_img1 from '../assets/girl.png';
import mock_img2 from '../assets/fuzz.png';
import mock_img3 from '../assets/blob.png';

const mock_projects = [
  {
    id: 1,
    name: 'Создание анимационного фильма',
    image: mock_img1,
    tags: [
      'графический дизайнер',
      'художник',
      'AI-дизайнер',
      'front разработчик',
      'маркетолог',
    ],
  },
  {
    id: 2,
    name: 'Сайт приюта для бездомных животных',
    image: mock_img2,
    tags: [
      'веб-дизайнер',
      'маркетолог',
      'back разработчик',
      'front разработчик',
    ],
  },
  {
    id: 3,
    name: 'Визуальная новелла «По ту сторону»',
    image: mock_img3,
    tags: ['графический дизайнер', 'маркетолог', 'геймдевелопер'],
  },
];

export const WeeklyProjects: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>проекты недели</h2>
        <ProjectsList data={mock_projects} />
        <Button className={styles.button}>Смотреть все проекты</Button>
      </div>
    </section>
  );
};
