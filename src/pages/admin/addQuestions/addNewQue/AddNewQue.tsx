import CustomMultiSelect from "@/components/custom/CustomMultiSelect"
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
  { name: 'Single Choice', code: 'single' },
  { name: 'Multiple Choice', code: 'multiple' },
  { name: 'Mixed Choice', code: 'mixed' },
  ];

  const countryOption: CountryOption[] = [
    { name: 'Option 1', code: '1' },
    { name: 'Option 2', code: '2' },
    { name: 'Option 3', code: '3' },
  ];

const AddNewQue = () => {
  const countryOption: CountryOption[] = [
    { name: 'Option 1', code: '1' },
    { name: 'Option 2', code: '2' },
    { name: 'Option 3', code: '3' },
  ];
  const [questionData, setQuestionData] = useState({
    "title": "",
    "type": null,
    "typeTitle": "",
    "category": "",
    "categoryTitle": "",
    "options": [],
    "answer": []
  })
  const handleSubmit = async()=>{
    // const response = await 
  }
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const handleCountryChange = (value: string) => {
        setSelectedCountry(value);
        console.log('Selected Country Code:', value);
      };
      const handleMultiCountryChange = (selectedOptions: string[]) => {
        setSelectedCountries(selectedOptions);
      };
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestionData({...questionData, title: e.target.value})
      }
  return (
    <>
    <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 sm:gap-4 sm:p-4 p-2">
        <div>
          <Label>Question Title</Label>
          <Input placeholder="Enter Question Title"  onChange={handleChange} name="title"/>
        </div>
        <div className="w-full">
          <CustomSelect 
          name="type"
          label="Select Question Type" 
          style="w-full" 
          options={countryOptions}
        optionLabel="name"      
        optionValue="code"     
        onChange={handleCountryChange}
        value={selectedCountry}
        placeholder="Select Question Type"
        styleOption="text-blue-600"
          />
        </div>
        <div className="w-full">
          <CustomSelect 
          name="category"
          label="Select Question Category" 
          style="w-full" star="*"
          options={countryOptions}
        optionLabel="name"      
        optionValue="code"     
        onChange={handleCountryChange}
        value={selectedCountry}
        placeholder="Select Question Category"
        styleOption="text-blue-600"
          />
        </div>
        <div>
          <Label>Option 1</Label>
          <Input placeholder="Enter Option 1" name="options"/>
        </div>
        <div>
          <Label>Option 2</Label>
          <Input placeholder="Enter Option 2" name="options"/>
        </div>
        <div>
          <Label>Option 3</Label>
          <Input placeholder="Enter Option 3" name="options"/>
        </div>
        <div>
          <Label>Option 4</Label>
          <Input placeholder="Enter Option 4" name="options"/>
        </div>

        <div className="w-full">
        <CustomMultiSelect
        name="answer"
        label="Select Correct Options"
        style="w-full"
        options={countryOption}
        optionLabel="name"
        optionValue="code"
        onChange={handleMultiCountryChange}
        value={selectedCountries}
        placeholder="Select Correct Options"
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

