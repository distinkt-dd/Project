import { ProjectItem } from '@entities/project';
import styles from './ProjectsList.module.css';
import mock1 from './assets/mock1.png';
import mock2 from './assets/mock2.png';
import mock3 from './assets/mock3.png';

const mock_projects = [
  {
    id: 1,
    name: 'Создание анимационного фильма',
    image: mock1,
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
    image: mock2,
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
    image: mock3,
    tags: ['графический дизайнер', 'маркетолог', 'геймдевелопер'],
  },
];

export const ProjectsList: React.FC = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {mock_projects.map((proj, i) => (
          <ProjectItem
            id={proj.id}
            name={proj.name}
            image={proj.image}
            tags={proj.tags}
            key={i}
          />
        ))}
      </ul>
    </div>
  );
};
