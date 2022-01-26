import React from 'react';
import { ReactComponent as GoogleSvg } from 'images/google-logo.svg';

import s from './AuthorizationWithGoogle.module.css';

const AuthorizationWithGoogle = () => {
  return (
    <div className={s.ButtonWrap}>
      <a
        // target="blank"
        href="https://kapusta-backend.goit.global/auth/google"
        className={s.ButtonGoogleAuth}
      >
        <GoogleSvg />
      </a>
    </div>
  );
};

export default AuthorizationWithGoogle;
