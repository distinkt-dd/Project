import { Button, Input } from '@shared/ui';
import styles from './RegisterParticipantForm.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EyeM, EyeMSlash } from '@shared/icons';

interface RegisterParticipantFormProps {
  role: string;
}

export const RegisterParticipantForm: React.FC<
  RegisterParticipantFormProps
> = ({ role: _role }) => {
  void _role;
  const [email, setEmail] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleloginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: запрос к API регистрации
  };

  return (
    <div className={styles.form}>
      <div className={styles.wrapper}>
        <Input
          labelText="Электронная почта"
          placeholder="example@domain.ru"
          type="email"
          onChange={handleEmailChange}
          value={email}
          required
        />
        <Input
          labelText="Логин"
          placeholder=""
          type="text"
          onChange={handleloginChange}
          value={login}
          required
          minLength={3}
          maxLength={15}
        />
        <Input
          labelText="Пароль"
          placeholder=""
          type={showPassword ? 'text' : 'password'}
          onChange={handlePasswordChange}
          value={password}
          required
          minLength={8}
          maxLength={20}
          rightIcon={showPassword ? <EyeM /> : <EyeMSlash />}
          onRightIconClick={() => setShowPassword((prev) => !prev)}
        />
        <p className={styles.policyText}>
          Нажимая «Зарегистрироваться», я даю согласие на обработку моих
          персональных данных <br /> и принимаю условия{' '}
          <Link to={'/policy'} className={styles.link}>
            Пользовательского соглашения
          </Link>{' '}
          и{' '}
          <Link to={'/policy'} className={styles.link}>
            Политики конфиденциальности
          </Link>
        </p>
      </div>
      <Button type="submit" className={styles.button} onClick={handleSubmit}>
        Зарегистрироваться
      </Button>
    </div>
  );
};
