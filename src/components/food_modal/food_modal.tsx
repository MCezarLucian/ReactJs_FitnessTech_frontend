import React, { useState } from 'react';
import './food_modal.scss';

interface Food {
  name: string;
  value: number;
}

interface FoodModalProps {
  food: Food;
  onFoodSelect: (value: number) => void;
  onClose: () => void;
}

const FoodModal: React.FC<FoodModalProps> = ({ food, onFoodSelect, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  };

  const handleConfirm = () => {
    onFoodSelect(quantity);
    onClose();
  };
  
  const handleClose = () => {
    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Select Quantity</h2>
        <div className="quantity-input">
          <label>(in grams):</label>
          <input type="number" value={quantity} min={1} onChange={handleQuantityChange} />
        </div>
        <div className="modal-actions">
          <button className="modal-btn cancel-btn" onClick={handleClose}>
            Cancel
          </button>
          <button className="modal-btn confirm-btn" onClick={handleConfirm}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodModal;
