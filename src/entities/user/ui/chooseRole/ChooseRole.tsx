import styles from './ChooseRole.module.css';
import { Radio } from '@shared/ui/radio';
import { Button } from '@shared/ui';

const roleOptions = [
  { label: 'Найти проект для участия', value: 'participant' },
  { label: 'Запустить свой проект и собрать команду ', value: 'owner' },
];

interface ChooseRoleProps {
  role: string;
  onChange: (role: string) => void;
  onNext: () => void;
}

export const ChooseRole: React.FC<ChooseRoleProps> = ({
  role,
  onChange,
  onNext,
}) => {
  return (
    <div className={styles.chooseRole}>
      <h3 className={styles.title}>Что вы хотите сделать?</h3>
      <div className={styles.radioGroup}>
        {roleOptions.map((option) => (
          <Radio
            key={option.value}
            name="role"
            label={option.label}
            value={option.value}
            checked={role === option.value}
            onChange={onChange}
            className={styles.radio}
          />
        ))}
      </div>
      <Button onClick={onNext} className={styles.button}>
        Далее
      </Button>
    </div>
  );
};
