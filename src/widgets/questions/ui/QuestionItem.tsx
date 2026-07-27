import { Plus, Close } from '@shared/icons';
import styles from './QuestionItem.module.css';

interface QuestionItemProps {
  question: string;
  answer: string;
  additional?: string;
  isOpen?: boolean;
  onToggle: () => void;
}

export const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  answer,
  additional,
  isOpen,
  onToggle,
}: QuestionItemProps) => {
  return (
    <div className={styles.item}>
      <div className={styles.top}>
        <span className={styles.question}>{question}</span>
        <button className={styles.button} onClick={onToggle}>
          {isOpen ? <Close /> : <Plus />}
        </button>
      </div>
      <div
        className={
          isOpen ? `${styles.answer} ${styles.answerOpen}` : styles.answer
        }
      >
        <p className={styles.text}>{answer}</p>
        {additional && <p className={styles.additional}>{additional}</p>}
      </div>
    </div>
  );
};
