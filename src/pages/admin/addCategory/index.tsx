import { Plus, Table } from 'lucide-react'
import CustomTable from '@/components/custom/CustomTable'
import CustomModal from '@/components/custom/customModal';


const AddCategory = () => {
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
  return (
    <div className='w-full  border-2 border-blue-500 h-[90vh]'>
        <div className='flex justify-end w-full px-6 pr-8'>
        <CustomModal dialogTitle="Add Category" dialogDescription="Question Category, e.g : General Knowledge, Current Affairs" label="Category" placeholder="Enter category"><Plus/></CustomModal> 
        </div>
        <CustomTable rowsData={invoices} headerData={headerData} />
    </div>
  )
}

export default AddCategory