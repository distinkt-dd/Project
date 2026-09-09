import { getServices } from '@app';
import { useNavigate } from 'react-router-dom';
import { Button } from '@shared/ui/button';
import styles from './MyProfilePage.module.css';

export const MyProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    getServices().auth.logout();
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Button
          variant="back"
          className={styles.backButton}
          onClick={() => navigate('/')}
        >
          На главную
        </Button>
        <section className={styles.section}>
          <h2 className={styles.title}>Личный кабинет</h2>
        </section>
        <section>
          <Button variant="tertiary" onClick={handleLogout}>
            Выйти
          </Button>
        </section>
      </div>
    </div>
  );
};
