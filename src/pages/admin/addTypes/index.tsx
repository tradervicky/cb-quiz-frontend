
import CustomSelect from '@/components/custom/CustomSelect';
import CustomTable from '@/components/custom/CustomTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { addTypes, getAdminTypes, getAvailableTypes } from '../apiCall';
interface CountryOption {
  name: string;
  code: string;
}

export const countryOptions: CountryOption[] = [
  { name: 'Single Choice', code: 'single' },
  { name: 'Multiple Choice', code: 'multiple' },
  { name: 'Mixed Choice', code: 'mixed' },

];
const AddTypes = () => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [availableTypes, setAvailableTypes] = useState([])
  const [adminTypes, setAdminTypes] = useState([])
  const handleCountryChange = (value: string) => {
    setSelectedType(value);
    console.log('Selected Type:', value);
  };

  const headerData = [
    { title: 'SL No.', key: 'serialNo' as const},
    { title: 'Question Type', key: 'queType' as const },
    { title: 'No. of Questions', key: 'noOfQue' as const },
    { title: 'Actions', key: 'actions' as const},
  ];
  

    const fetchQuestionTypes = async()=>{
      const response = await getAvailableTypes()
   
      setAvailableTypes(response?.types.map((data)=>
       ( {name:data.title,code:data.title})
      ))
    }
    
    const fetchAdminQuestionTypes = async ()=>{
     const response = await getAdminTypes()
     console.log(response)
     setAdminTypes(response?.data.map((data, index)=>
      ({serialNo: index+1, queType: data.title, noOfQue:data.noOfQue, actions: (
        <div>
          <Button>delete</Button>
        </div>
      ) })
    ))
  }
  console.log(adminTypes)
    useEffect(()=>{
      fetchAdminQuestionTypes()
      fetchQuestionTypes()
    },[])
    const handleAddType = async()=>{
      const response = await addTypes({title:selectedType})
    }
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
        options={availableTypes}
        optionLabel="name"      
        optionValue="code"     
        onChange={handleCountryChange}
        value={selectedType}
        placeholder="Choose Question Types"
        styleOption="text-blue-600"
        />
      
       
       
        <DialogFooter>
          <Button type="submit" onClick={handleAddType}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
      </div>
      <CustomTable headerData={headerData} rowsData={adminTypes}/>
    </div>
  )
}

export default AddTypes