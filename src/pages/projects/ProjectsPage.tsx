import { useState } from 'react';
import styles from './ProjectsPage.module.css';
import { Button } from '@shared/ui/button';
import { Filter } from '@features/filter';
import { ProjectsList } from '@widgets/projectsList';
import mock_img1 from './assets/girl.png';
import mock_img2 from './assets/fuzz.png';
import mock_img3 from './assets/blob.png';
import mock_img4 from './assets/orb.png';
import mock_img5 from './assets/cover.jpg';
import mock_img6 from './assets/girl(1).png';
import mock_img7 from './assets/hills.png';

const PAGE_SIZE = 3;

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
  {
    id: 4,
    name: 'Стартап приложения для развития младенцев',
    image: mock_img4,
    tags: [
      'UX/UI дизайнер',
      'маркетолог',
      'продуктовый дизайнер',
      'разработка',
    ],
  },
  {
    id: 5,
    name: 'Съемка клипа в жанре триллер',
    image: mock_img5,
    tags: ['продюсер', 'моушн-дизайнер', 'сторителлер', 'актер', 'актриса'],
  },
  {
    id: 6,
    name: 'Выпускной короткий метр',
    image: mock_img6,
    tags: ['режиссер', 'звукорежиссер', 'стилист', 'актер', 'актриса'],
  },
  {
    id: 7,
    name: 'ТГ-канал про здоровый образ жизни',
    image: mock_img7,
    tags: ['SMM', 'контекстная реклама', 'копирайтер'],
  },
];

export const ProjectsPage: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleProjects = mock_projects.slice(0, visibleCount);
  const hasMore = visibleCount < mock_projects.length;

  const handleShowMore = () => {
    setVisibleCount((count) =>
      Math.min(count + PAGE_SIZE, mock_projects.length)
    );
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <section className={styles.section}>
          <h2 className={styles.title}>Все проекты </h2>
          <Filter className={styles.filter} />
          <ProjectsList
            data={visibleProjects}
            className={styles.projectsList}
          />
          {hasMore && (
            <Button className={styles.button} onClick={handleShowMore}>
              Показать еще
            </Button>
          )}
        </section>
      </div>
    </main>
  );
};
