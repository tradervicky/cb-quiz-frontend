// Summary.tsx
import React from 'react';
import { PlanOptionProps, BillingAddressProps, PaymentMethodProps } from '../../../../interfaces/checkout';

interface SummaryProps {
  selectedPlan: PlanOptionProps;
  country: string;
  state: string;
  cardHolderName: string;
  cardNumber: string;
}

const Summary: React.FC<SummaryProps> = ({
  selectedPlan,
  country,
  state,
  cardHolderName,
  cardNumber,
}) => {
  return (
    <div className="p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Summary</h2>

      {/* Selected Plan */}
      <div className="mb-6">
        <h3 className="text-lg font-medium">Selected Plan</h3>
        <div className="text-gray-700">{selectedPlan.name}</div>
        <div className="text-gray-500">Price: ₹{selectedPlan.price}/mo</div>
        {selectedPlan.savings && selectedPlan.savings > 0 && (
          <div className="text-green-500">Savings: ₹{selectedPlan.savings}</div>
        )}
        <ul className="mt-2 text-gray-600">
          {selectedPlan.features?.map((feature, index) => (
            <li key={index}>• {feature}</li>
          ))}
        </ul>
      </div>

      {/* Billing Address */}
      <div className="mb-6">
        <h3 className="text-lg font-medium">Billing Address</h3>
        <div className="text-gray-700">{country}</div>
        <div className="text-gray-500">{state}</div>
      </div>

      {/* Payment Details */}
      <div>
        <h3 className="text-lg font-medium">Payment Details</h3>
        <div className="text-gray-700">Cardholder Name: {cardHolderName}</div>
        <div className="text-gray-500">Card Number: **** **** **** {cardNumber.slice(-4)}</div>
      </div>
    </div>
  );
};

export default Summary;
