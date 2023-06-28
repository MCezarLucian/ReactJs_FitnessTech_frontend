import React, { useState, useEffect } from 'react';
import './modal_image.scss';

interface ModalProps {
  imageUrl: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ imageUrl, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      setIsLoading(false);
    };
  }, [imageUrl]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <img src={imageUrl} alt="Modal" className='img_modal' />
        )}
        <button className="modal-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
