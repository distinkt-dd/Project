import styles from './FindTeamStep.module.css';

interface FindTeamStepProps {
  step: number;
  title: string;
  text: string;
}

export const FindTeamStep: React.FC<FindTeamStepProps> = ({
  step,
  title,
  text,
}: FindTeamStepProps) => {
  return (
    <article className={styles.card}>
      <span className={styles.step}>Шаг {step}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
    </article>
  );
};
