// PaymentMethod.tsx
import React from 'react';
import { PaymentMethodProps } from '../../../../interfaces/checkout';

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  cardNumber,
  expirationDate,
  securityCode,
  cardHolderName,
  onCardNumberChange,
  onExpirationDateChange,
  onSecurityCodeChange,
  onCardHolderNameChange,
}) => {
  return (
    <div>
      <div className="mb-4">
        <label>Card Number</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => onCardNumberChange(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label>Expiration Date</label>
        <input
          type="text"
          value={expirationDate}
          onChange={(e) => onExpirationDateChange(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label>Security Code</label>
        <input
          type="text"
          value={securityCode}
          onChange={(e) => onSecurityCodeChange(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label>Name on Card</label>
        <input
          type="text"
          value={cardHolderName}
          onChange={(e) => onCardHolderNameChange(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
    </div>
  );
};

export default PaymentMethod;
