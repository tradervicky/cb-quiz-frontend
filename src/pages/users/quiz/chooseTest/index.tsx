import CustomSelect from '@/components/custom/CustomSelect'
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import Header from '../../header';

const ChooseTest = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const testCategories = [
    { id: '1', name: 'Math' },
    { id: '2', name: 'Science' },
    { id: '3', name: 'History' },
    { id: '4', name: 'Geography' },
  ];
  const testTypes = [
    { id: '1', name: 'Single Choice' },
    { id: '2', name: 'Multiple Choice' },
    { id: '3', name: 'Mixed (Single & Multiple choice both)' },
  ];
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };
  const handleTypeChange = (typeId: string) => {
    setSelectedType(typeId);
  };
  return (
    <>

<Header/>
    <div className='m-5 rounded-lg shadow-lg bg-secondary'>
      <h1 className='font-bold text-3xl p-4 border-b border-highlight '>

      Dashboard
      </h1>
      <div className='flex flex-col sm:flex-row  sm:items-center gap-4 px-8 py-4'>
        <div className='w-1/12'>

        <p className='font-semibold '>Category  </p> 
        </div>
        <div className='w-full '>

        <CustomSelect
          options={testCategories}
          optionLabel="name"  
          optionValue="id" 
          value={selectedCategory}
          placeholder="Select a category"
          onChange={handleCategoryChange}
          style="w-full border p-2 rounded bg-secondary"
        />
        </div>
      </div>
      <div className='flex mt-4 sm:items-center gap-4 px-8 sm:flex-row flex-col '>
        <div className='w-1/12'>

        <p className='font-semibold '>Types </p> 
        </div>
        <div className='w-full '>

        <CustomSelect
          options={testTypes}
          optionLabel="name"  
          optionValue="id" 
          value={selectedType}
          placeholder="Select a Type"
          onChange={handleTypeChange}
          style="w-full border p-2 rounded bg-secondary"
        />
        </div>
      </div>

      <div>
        Captcha Board
      </div>

      <div className='flex justify-center pb-4'>
        <Button title='Start Test' variant={'outline'}> Start Test</Button>
      </div>
    </div>
    </>
  )
}

export default ChooseTest