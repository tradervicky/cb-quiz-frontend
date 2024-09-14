import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReactNode } from "react";

interface CustomSelectProps<T extends Record<string, any>> {
  label?: string;
  options: T[];
  star?: string;
  placeholder?: ReactNode;
  onChange: (value: string) => void;
  value?: string;
  optionLabel: keyof T;
  optionValue: keyof T;
  name?: string;
  disabled?: boolean;
  style?: string;
  styleOption?: string;
}

const CustomSelect = <T extends Record<string, any>>({
  label,
  options,
  star,
  placeholder,
  onChange,
  value,
  optionLabel,
  optionValue,
  name,
  disabled,
  style,
  styleOption,
}: CustomSelectProps<T>) => {
  return (
    <div>
      {label && (
        <label>
          {label} <span>{star}</span>
        </label>
      )}
      <Select
        disabled={disabled}
        name={name}
        required={star ? true : false}
        value={value}
        onValueChange={onChange} 
      >
        <SelectTrigger className={style || "w-[180px]"}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className={styleOption}>
            {Array.isArray(options) &&
              options.map((option, index) => (
                <SelectItem
                  key={index}
                  value={String(option[optionValue])} 
                >
                  {option[optionLabel] as ReactNode} // Ensure it's cast to a valid ReactNode
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelect;
