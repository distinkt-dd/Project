import { Hero } from '@widgets/hero';
import styles from './MainPage.module.css';

export const MainPage: React.FC = () => {
  return (
    <main className={styles.main}>
      <Hero />
    </main>
  );
};
