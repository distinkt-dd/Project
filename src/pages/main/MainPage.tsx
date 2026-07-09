import { Hero } from '@widgets/hero';
import styles from './MainPage.module.css';
import { ProjectsList } from '@widgets/projectsList';

export const MainPage: React.FC = () => {
  return (
    <main className={styles.main}>
      <Hero />
      <ProjectsList />
    </main>
  );
};
