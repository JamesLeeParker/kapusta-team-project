import PropTypes from 'prop-types';
import s from './ConfirmModal.module.css';
import Button from 'components/Button/Button';
import { ReactComponent as CloseIcon } from 'images/close.svg';

function ConfirmModal({ question = 'Вы уверены?', onClose, onConfirm }) {
  return (
    <div className={s.container}>
      <CloseIcon onClick={onClose} className={s.icon} />
      <p className={s.title}>{question}</p>
      <div className={s.buttonWrapper}>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          title="Да"
          type="active"
        />
        <Button onClick={onClose} title="Нет" type="default" />
      </div>
    </div>
  );
}

ConfirmModal.propTypes = {
  question: PropTypes.string,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default ConfirmModal;
