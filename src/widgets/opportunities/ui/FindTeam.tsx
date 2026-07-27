import { useNavigate } from 'react-router-dom';
import styles from './FindTeam.module.css';
import { FindTeamStep } from './FindTeamStep';
import { Button } from '@shared/ui';

interface StepCard {
  title: string;
  text: string;
}

interface FindTeamProps {
  data: StepCard[];
}

export const FindTeam: React.FC<FindTeamProps> = ({ data }: FindTeamProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.findTeam}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>
            Есть идея? Найди команду для реализации
          </h2>
          <span className={styles.signature}>
            Расскажи о проекте и найди участников с нужными навыками
          </span>
        </div>
        <ul className={styles.list}>
          {data.map((item, index) => (
            <li key={index}>
              <FindTeamStep
                step={index + 1}
                title={item.title}
                text={item.text}
              />
            </li>
          ))}
        </ul>
        <Button
          className={styles.button}
          onClick={() => navigate('/edit-project')}
        >
          Создать проект
        </Button>
      </div>
    </div>
  );
};
