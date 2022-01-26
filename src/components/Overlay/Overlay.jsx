import s from './Overlay.module.css';
import PropTypes from 'prop-types';

const Overlay = ({ children, onOverlayClick }) => {
  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onOverlayClick();
    }
  };

  return (
    <div onClick={handleOverlayClick} className={s.overlay}>
      {children}
    </div>
  );
};

Overlay.propTypes = {
  children: PropTypes.object.isRequired,
  onOverlayClick: PropTypes.func.isRequired,
};

export default Overlay;
