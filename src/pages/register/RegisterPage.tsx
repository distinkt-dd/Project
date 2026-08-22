import { Stepper } from '@shared/ui/stepper';
import styles from './RegisterPage.module.css';
import {
  ChooseRole,
  RegisterOwnerForm,
  RegisterParticipantForm,
} from '@entities/user';
import { useState } from 'react';
import bottomImg from './assets/bottom.png';
import { Button } from '@shared/ui';
import { useNavigate } from 'react-router-dom';

export const RegisterPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('participant');

  const navigate = useNavigate();

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      navigate(-1);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Button variant="back" onClick={handleBack}>
          Назад
        </Button>
      </div>
      <Stepper max={2} current={step} />
      <h2 className={styles.title}>Пожалуйста, зарегистрируйтесь</h2>
      <form>
        {step === 1 ? (
          <ChooseRole
            role={role}
            onChange={setRole}
            onNext={() => setStep(2)}
          />
        ) : role === 'participant' ? (
          <RegisterParticipantForm role={role} />
        ) : (
          <RegisterOwnerForm role={role} />
        )}
      </form>
      <img src={bottomImg} aria-hidden="true" className={styles.img} />
    </main>
  );
};
