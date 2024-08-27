import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReactNode } from "react";
interface CustomSelectProps<T> {
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
const CustomSelect= <T,> ({
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
        onChange={onChange}
      >
        <SelectTrigger className={style || "w-[180px]"}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className={styleOption}>
            {Array.isArray(options) &&
              options?.map((option, index) => (
                <SelectItem key={index} value={option[optionValue]}>
                  {option[optionLabel]}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelect;
