import { Hero } from '@widgets/hero';
import styles from './MainPage.module.css';
import { WeeklyProjects } from '@widgets/weeklyProjects';

export const MainPage: React.FC = () => {
  return (
    <main className={styles.main}>
      <Hero />
      <WeeklyProjects />
    </main>
  );
};
