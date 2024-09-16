// Checkout.tsx
import React, { useState } from 'react';
import { PlanOptionProps } from '../../../../interfaces/checkout';
import PlanOption from './planOption';
import BillingAddress from './billingAddress';
import PaymentMethod from './paymentOption';
import Summary from './summary';

const plans: PlanOptionProps[] = [
  {
    name: 'Monthly Access',
    price: 1039,
    value: 'monthly',
    savings: 0,
    features: ['Access to 12,000 courses', 'Hands-on learning', 'Course recommendations'],
  },
  {
    name: 'Yearly Access',
    price: 850,
    value: 'yearly',
    savings: 2268,
    features: ['Access to 12,000 courses', 'Hands-on learning', 'Course recommendations'],
  },
];

const planOption = {
    name : "Monthly",
    price : 4700,
    value : "4500",
    savings : 200,
    features : ["Feature 1", "Featture 2"]
}


    
    const country = "India";
    const state = "Bihar";
    const cardHolderName =  "Vicky Gupta";
    const cardNumber=  "459158456385"



const Checkout = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('yearly');
  const [country, setCountry] = useState<string>('India');
  const [state, setState] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');
  const [securityCode, setSecurityCode] = useState<string>('');
  const [cardHolderName, setCardHolderName] = useState<string>('');

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Personal Plan</h2>
        <div className="flex space-x-4">
          {plans.map((plan) => (
            <PlanOption
              key={plan.value}
              plan={plan}
              selected={selectedPlan === plan.value}
              onChange={setSelectedPlan}
            />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
        <BillingAddress country={country} state={state} onCountryChange={setCountry} onStateChange={setState} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        <PaymentMethod
          cardNumber={cardNumber}
          expirationDate={expirationDate}
          securityCode={securityCode}
          cardHolderName={cardHolderName}
          onCardNumberChange={setCardNumber}
          onExpirationDateChange={setExpirationDate}
          onSecurityCodeChange={setSecurityCode}
          onCardHolderNameChange={setCardHolderName}
        />
      </div>

      <div className="text-right">
        <button className="bg-purple-600 text-white py-2 px-4 rounded">Start Subscription</button>
      </div>
      <Summary selectedPlan={planOption} country={country} state={state} cardHolderName={cardHolderName} cardNumber={cardNumber} />
    </div>
  );
};

export default Checkout;
