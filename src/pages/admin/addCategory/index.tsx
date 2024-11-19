import { Plus, Table } from 'lucide-react'
import CustomTable from '@/components/custom/CustomTable'
import CustomModal from '@/components/custom/customModal';
import { addCategory, getAdminCategory } from '../apiCall';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

type Category = {
  serialNo: number;
  categoryName: string;
  noOfQue: string;
  actions: JSX.Element;
};

const AddCategory = () => {
  const [categoryTitle, setCategoryTitle] = useState("")
  const [categoryList, setCategoryList] = useState<Category[]>([])
  const headerData = [
    { title: 'SL No.', key: 'serialNo' as const},
    { title: 'Category Name', key: 'categoryName' as const },
    { title: 'No. of Questions', key: 'noOfQue' as const },
    { title: 'Actions', key: 'actions' as const},
  ];
  
    const invoices = [
      {
        serialNo: '1',
        categoryName: 'General knowledge',
        noOfQue: '250',
        actions: 'Credit Card',
      },
      {
        serialNo: '2',
        categoryName: 'General Science',
        noOfQue: '150',
        actions: 'PayPal',
      },
      {
        serialNo: '3',
        categoryName: 'Mathematics',
        noOfQue: '50',
        actions: 'Bank Transfer',
      },
    ];
    const handleClick= ()=>{
      addCategory({title:categoryTitle})
    }
    const handleGetCategory = async () => {
      const response = await getAdminCategory();
      setCategoryList(
        response?.data.map((d:any, index:number) => ({
          serialNo: index + 1,
          categoryName: d.title,
          noOfQue: '150',
          actions: (
            <div>
              <Button>delete</Button>
            </div>
          ),
        }))
      );
    };
    
    useEffect(()=>{
      handleGetCategory()
    },[])
  return (
    <div className='w-full   h-[90vh]'>
        <div className='flex justify-end w-full px-6 pr-8'>
        <CustomModal dialogTitle="Add Category" dialogDescription="Question Category, e.g : General Knowledge, Current Affairs" label="Category" placeholder="Enter category" onClick={handleClick} setCategoryTitle={setCategoryTitle}><Plus/></CustomModal> 
        </div>
        <CustomTable rowsData={categoryList} headerData={headerData} />
    </div>
  )
}

export default AddCategory