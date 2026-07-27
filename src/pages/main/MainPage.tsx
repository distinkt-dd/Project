import { Hero } from '@widgets/hero';
import styles from './MainPage.module.css';
import { WeeklyProjects } from '@widgets/weeklyProjects';
import { Opportunities } from '@widgets/opportunities';
import { Questions } from '@widgets/questions';

export const MainPage: React.FC = () => {
  return (
    <main className={styles.main}>
      <Hero />
      <WeeklyProjects />
      <Opportunities />
      <Questions />
    </main>
  );
};
