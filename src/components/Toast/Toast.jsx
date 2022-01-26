import s from './Toast.module.css';
import { ReactComponent as CloseIcon } from 'images/close.svg';
import PropTypes from 'prop-types';

const Toast = ({ onClose }) => {
  return (
    <div className={s.Toast}>
      <div className={s.triangle} />
      <div className={s.rectangle}>
        <button className={s.button} type={'button'} onClick={onClose}>
          <CloseIcon className={s.icon} />
        </button>
        <p className={s.text}>
          Привет! Для начала работы внеси текущий баланс своего счета!
        </p>
        <p className={s.textDown}>
          Ты не можешь тратить деньги пока их у тебя нет ;)
        </p>
      </div>
    </div>
  );
};

Toast.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Toast;
