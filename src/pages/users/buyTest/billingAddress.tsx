// BillingAddress.tsx
import React from 'react';
import { BillingAddressProps } from '../../../../interfaces/checkout';

const BillingAddress: React.FC<BillingAddressProps> = ({
  country,
  state,
  onCountryChange,
  onStateChange,
}) => {
  return (
    <div>
      <div className="mb-4">
        <label className="block">Country</label>
        <select
          value={country}
          onChange={(e) => onCountryChange(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="India">India</option>
          {/* Add more country options */}
        </select>
      </div>
      <div className="mb-4">
        <label className="block">State / Union Territory</label>
        <select
          value={state}
          onChange={(e) => onStateChange(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Select State</option>
          <option value="Bihar">Bihar</option>
          {/* Add more states */}
        </select>
      </div>
    </div>
  );
};

export default BillingAddress;
