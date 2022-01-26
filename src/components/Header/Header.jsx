import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import logo from 'images/logo.svg';
import logoutPic from 'images/logout-mobile.svg';
import { getIsLoggedIn } from 'redux/auth';
import s from './Header.module.css';
import { openLogoutModal } from 'redux/modal';
import { Link } from 'react-router-dom';
import { getEmail } from 'redux/user';

const Header = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const userEmail = useSelector(getEmail);
  const userLogo = userEmail.slice(0, 1).toUpperCase();
  const dispatch = useDispatch();

  const handleResizeWindow = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  const breakPointTablet = 768;
  return (
    <div className={s.container}>
      <div className={s.header__wrap}>
        <Link to={'/day-report'}>
          <img src={logo} alt={'logo'} />
        </Link>
        {isLoggedIn && (
          <div className={s.header__nav}>
            <div className={s.userLogo__circle}>
              <div className={s.userLogo}>{userLogo}</div>
            </div>
            {width < breakPointTablet ? (
              <img
                className={s.logout__picture}
                onClick={() => dispatch(openLogoutModal())}
                src={logoutPic}
                alt={'logout'}
              />
            ) : (
              <>
                <div className={s.user__name}>{userEmail}</div>
                <div className={s.line} />
                <div
                  className={s.logout}
                  onClick={() => dispatch(openLogoutModal())}
                >
                  Выйти
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
