import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Overlay from 'components/Overlay';
import s from './Modal.module.css';

const Modal = ({ children, onClose }) => {
  const modalRef = useRef(document.querySelector('#modal'));

  useEffect(() => {
    window.addEventListener('keydown', onEscPress);
    return () => window.removeEventListener('keydown', onEscPress);
  });

  const onEscPress = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const modal = <div className={s.modal}>{children}</div>;

  return createPortal(
    <Overlay onOverlayClick={onClose}>{modal}</Overlay>,
    modalRef.current,
  );
};

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
