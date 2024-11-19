import React, { useState, useEffect, useRef } from 'react';

// Define the types for the option object
type OptionType = {
  [key: string]: any; // A generic option type to accommodate different structures
};

// Define the types for the props
interface CustomMultiSelectProps {
  name: string;
  label?: string;
  options: OptionType[];
  optionLabel: string; // The key in each option object for the display label
  optionValue: string; // The key in each option object for the value
  value: string[]; // Array of selected values
  onChange: (selectedOptions: string[]) => void; // Callback when selection changes
  placeholder?: string;
  style?: string;
  styleOption?: string;
}

const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({
  name,
  label,
  options,
  optionLabel,
  optionValue,
  value,
  onChange,
  placeholder = "Select options",
  style = "",
  styleOption = "",
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Reference to the component

  const handleToggle = () => setOpen(!open);

  const handleOptionChange = (selectedValue: string) => {
    const selectedOptions = value.includes(selectedValue)
      ? value.filter((v) => v !== selectedValue)
      : [...value, selectedValue];
    onChange(selectedOptions);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${style}`} ref={dropdownRef}>
      {label && <label htmlFor={name}>{label}</label>}
      <div
        className="border p-2 rounded-md cursor-pointer"
        onClick={handleToggle}
      >
        {value.length > 0
          ? options
              .filter((option) => value.includes(option[optionValue]))
              .map((option) => option[optionLabel])
              .join(", ")
          : placeholder}
      </div>

      {open && (
        <div className="absolute bg-white border mt-1 z-10 max-h-60 overflow-auto w-full">
          {options.map((option) => (
            <div
              key={option[optionValue]}
              className={`flex items-center p-2 ${styleOption}`}
            >
              <input
                type="checkbox"
                checked={value.includes(option[optionValue])}
                onChange={() => handleOptionChange(option[optionValue])}
              />
              <label className="ml-2">{option[optionLabel]}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomMultiSelect;
