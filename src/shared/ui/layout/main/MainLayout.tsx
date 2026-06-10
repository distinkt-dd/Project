import { Footer } from '@widgets/footer/ui/Footer';
import { Header } from '@widgets/header';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';

export const MainLayout = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
