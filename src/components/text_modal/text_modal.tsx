import React from 'react';
import './text_modal.scss';

interface ModalProps {
  text: string;
  onClose: () => void;
}

const TextModal: React.FC<ModalProps> = ({ text, onClose }) => {
  return (
    <div className="modal-overlay_t">
      <div className="modal-content_t">
        <div className="modal-text_t">{text}</div>
        <button className="modal-close-button_t" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TextModal;
