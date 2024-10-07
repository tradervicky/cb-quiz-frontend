import CustomSelect from "@/components/custom/CustomSelect"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"


interface CountryOption {
    name: string;
    code: string;
  }
export const countryOptions: CountryOption[] = [
    { name: 'United States', code: 'US' },
    { name: 'Canada', code: 'CA' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'Australia', code: 'AU' },
    { name: 'Germany', code: 'DE' },
  ];

const AddNewQue = () => {
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const handleCountryChange = (value: string) => {
        setSelectedCountry(value);
        console.log('Selected Country Code:', value);
      };
  return (
    <>
    <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 sm:gap-4 sm:p-4 p-2">
        <div>
          <Label>Question Title</Label>
          <Input placeholder="Enter Question Title" />
        </div>
        <div className="w-full">
          <CustomSelect 
          label="Select Question Type" 
          style="w-full" star="*"
          options={countryOptions}
        optionLabel="name"      
        optionValue="code"     
        onChange={handleCountryChange}
        value={selectedCountry}
        placeholder="Choose a country"
        styleOption="text-blue-600"
          />
        </div>
        <div className="w-full">
          <CustomSelect 
          label="Select Question Category" 
          style="w-full" star="*"
          options={countryOptions}
        optionLabel="name"      
        optionValue="code"     
        onChange={handleCountryChange}
        value={selectedCountry}
        placeholder="Choose a country"
        styleOption="text-blue-600"
          />
        </div>
        <div>
          <Label>Option 1</Label>
          <Input placeholder="Enter Option 1" />
        </div>
        <div>
          <Label>Option 2</Label>
          <Input placeholder="Enter Option 2" />
        </div>
        <div>
          <Label>Option 3</Label>
          <Input placeholder="Enter Option 3" />
        </div>
        <div>
          <Label>Option 4</Label>
          <Input placeholder="Enter Option 4" />
        </div>

        <div className="w-full">
          <CustomSelect 
          label="Select Correct Option" 
          style="w-full" star="*"
          options={countryOptions}
        optionLabel="name"      
        optionValue="code"     
        onChange={handleCountryChange}
        value={selectedCountry}
        placeholder="Choose a country"
        styleOption="text-blue-600"
          />
        </div>
       
      </div>
      <div className="w-full flex justify-end pr-4">
        <Button>Submit</Button>
      </div>
        
    </>
  )
}

export default AddNewQue

