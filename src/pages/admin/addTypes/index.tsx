import CustomTable from '@/components/custom/CustomTable';
import React from 'react'

const AddTypes = () => {
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
      <div className='flex justify-end pr-6 pt-4'>
      </div>
      <CustomTable headerData={headerData} rowsData={rowData}/>
    </div>
  )
}

export default AddTypes