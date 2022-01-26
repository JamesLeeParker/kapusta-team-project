import AuthorizationWithGoogle from 'components/AuthorizationWithGoogle';
import AuthorizationWithEmail from 'components/AuthorizationWithEmail';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import s from './AuthView.module.css';
import { ReactComponent as HeroLogo } from 'images/union.svg';
import Notiflix from 'notiflix';

const AuthView = () => {
  const errorAlert = useSelector(state => state?.auth?.error);
  useEffect(() => {
    if (!errorAlert) {
      return;
    }
    Notiflix.Notify.failure(errorAlert);
  }, [errorAlert]);
  return (
    <>
      <div className={s.WrapMainPage}>
        <div className={s.HeroWrap}>
          <HeroLogo className={s.HeroLogo} />
          <h1 className={s.HeroTitle}>Smart Finance</h1>
        </div>
        <div className={s.authWrapper}>
          <p className={s.authWithGoogleTitle}>
            Вы можете авторизоваться с помощью Google Account:
          </p>
          <AuthorizationWithGoogle />
          <p className={s.authWithEmailTitle}>
            Или зайти с помощью e-mail и пароля, предварительно
            зарегистрировавшись:
          </p>
          <AuthorizationWithEmail />
        </div>
      </div>
    </>
  );
};

export default AuthView;
