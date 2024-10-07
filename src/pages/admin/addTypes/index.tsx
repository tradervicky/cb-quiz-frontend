
import CustomSelect from '@/components/custom/CustomSelect';
import CustomTable from '@/components/custom/CustomTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useState } from 'react';
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
const AddTypes = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    console.log('Selected Country Code:', value);
  };

  const headerData = [
    { title: 'SL No.', key: 'serialNo' as const},
    { title: 'Question Type', key: 'queType' as const },
    { title: 'No. of Questions', key: 'noOfQue' as const },
    { title: 'Actions', key: 'actions' as const},
  ];
  
    const rowData = [
      {
        serialNo: '1',
        queType: 'Single Choice',
        noOfQue: '250',
        actions: 'Credit Card',
      },
      {
        serialNo: '2',
        queType: 'Multiple Choice',
        noOfQue: '150',
        actions: 'PayPal',
      },
   
    ];
  return (
    <div>
      <div className='flex justify-end pr-6 pt-4 cursor-pointer'>
      <Dialog>
            <div className='w-full  flex justify-end my-2'>

      <DialogTrigger asChild>
        <Button variant="outline"><Plus/></Button>
      </DialogTrigger>
            </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Quiz</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
       
        <CustomSelect 
        label='Select Type' 
        style="w-full"
        options={countryOptions}
        optionLabel="name"      
        optionValue="code"     
        onChange={handleCountryChange}
        value={selectedCountry}
        placeholder="Choose a country"
        styleOption="text-blue-600"
        />
      
       
       
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
      </div>
      <CustomTable headerData={headerData} rowsData={rowData}/>
    </div>
  )
}

export default AddTypes