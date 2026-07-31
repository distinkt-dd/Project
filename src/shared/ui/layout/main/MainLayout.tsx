import { Footer } from '@widgets/footer/ui/Footer';
import { Header } from '@widgets/header';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './MainLayout.module.css';

const hideHeaderRoutes = [''];
const hideFooterRoutes = ['/participants'];

export const MainLayout = () => {
  const { pathname } = useLocation();

  const showHeader = !hideHeaderRoutes.includes(pathname);
  const showFooter = !hideFooterRoutes.includes(pathname);

  return (
    <div className={styles.wrapper}>
      {showHeader && <Header />}
      <main className={styles.main}>
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  );
};
