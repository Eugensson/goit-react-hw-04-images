import { useEffect } from 'react';
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';

import { Backdrop, Content } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {

   useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
      };
    
  return createPortal(
      <Backdrop onClick={handleBackdropClick}>
        <Content>
          {children}
        </Content>
      </Backdrop>, modalRoot)
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
