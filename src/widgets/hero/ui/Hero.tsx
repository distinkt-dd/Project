import styles from './Hero.module.css';
import { Button } from '@shared/ui';

export const Hero: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={`${styles.signature} ${styles.leftSignature}`}>
            Объединяем{' '}
            <span className={styles.accent}>
              спациалистов IT и креативных
              <br />
              професий
            </span>{' '}
            для реальных проектов
            <br />в портфолио
          </span>
          <h1 className={styles.title}>
            <span className={`${styles.titleAccent} ${styles.accent}`}>
              Найди команду
            </span>
            <br />
            для своего проекта
          </h1>
          <span className={`${styles.signature} ${styles.titleSignature}`}>
            или присоединись к существующему
          </span>
          <nav className={styles.buttonContainer}>
            <Button variant="secondary">Найти команду</Button>
            <Button>Создать команду</Button>
          </nav>
        </div>
        <span className={`${styles.signature} ${styles.rightSignature}`}>
          сеть проектов, где таланты находят
          <br />
          миссию, а идеи — команду
        </span>
      </div>
    </section>
  );
};
