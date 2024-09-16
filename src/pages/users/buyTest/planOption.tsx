// PlanOption.tsx
import React from 'react';
import {PlanOptionProps} from '../../../../interfaces/checkout'
interface PlanProps {
  plan: PlanOptionProps;
  selected: boolean;
  onChange: (value: string) => void;
}

const PlanOption: React.FC<PlanProps> = ({ plan, selected, onChange }) => {
  return (
    <div className={`border ${selected ? 'border-black' : 'border-gray-300'} p-4 rounded-md`}>
      <input
        type="radio"
        name="plan"
        value={plan.value}
        checked={selected}
        onChange={() => onChange(plan.value)}
        className="mr-3"
      />
      <span className="text-xl font-semibold">{plan.name}</span>
      <div className="text-gray-500">₹{plan.price}/mo</div>
      {plan.savings && plan.savings > 0 && (
        <div className="text-green-500">Save ₹{plan.savings}</div>
      )}
      <ul className="mt-2 text-gray-600">
        {plan.features?.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlanOption;
