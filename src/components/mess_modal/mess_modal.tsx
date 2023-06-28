import React from 'react';
import './mess_modal.scss';

interface ModalProps {
  name: string;
  age: number;
  height: number;
  weight: number;
  problems: string[];
  onClose: () => void;
}

const MessModal: React.FC<ModalProps> = ({
  name,
  age,
  height,
  weight,
  problems,
  onClose
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{name}</h2>
        <p>Age: {age}</p>
        <p>Height: {height} cm</p>
        <p>Weight: {weight} kg</p>
        <h3>Problems:</h3>
        <ul>
          {problems.map((problem, index) => (
            <li key={index}>{problem}</li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MessModal;
