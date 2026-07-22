import { Input, Button } from '@shared/ui';
import styles from './LoginForm.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { EyeM, EyeMSlash } from '@shared/icons';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: запрос к API авторизации
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Button variant="back" onClick={() => navigate(-1)}>
          Назад
        </Button>
        <h2 className={styles.title}>Вход в личный кабинет</h2>
        <form className={styles.form}>
          <div className={styles.inputs}>
            <Input
              labelText="Логин"
              onChange={handleLoginChange}
              value={login}
              type="email"
            />
            <Input
              labelText="Пароль"
              onChange={handlePasswordChange}
              value={password}
              type={showPassword ? 'text' : 'password'}
              rightIcon={showPassword ? <EyeM /> : <EyeMSlash />}
              onRightIconClick={() => setShowPassword((prev) => !prev)}
            />
          </div>
          {/* TODO: Сделать страницу сброса пароля */}
          <Link to={'/reset'} className={styles.resetLink}>
            Забыли пароль?
          </Link>

          <div className={styles.bottom}>
            <Button className={styles.loginButton} onClick={handleSubmit}>
              Войти
            </Button>
            {/* TODO: Сделать страницу регистрации */}
            <span className={styles.registerText}>
              Если нет аккаунта,{' '}
              <Link to={'/reset'} className={styles.registerLink}>
                зарегистрируйтесь
              </Link>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};
