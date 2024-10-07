import CustomTable from "@/components/custom/CustomTable";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddQuiz from "./AddQuiz";
import { useState } from "react";

const CreateQuiz = () => {
  const [isAddQuiz, setIsAddQuiz] = useState(false);

  const headerData = [
    { title: "SL No.", key: "serialNo" as const },
    { title: "Question Type", key: "queType" as const },
    { title: "No. of Questions", key: "noOfQue" as const },
    { title: "Actions", key: "actions" as const },
  ];

  const rowData = [
    {
      serialNo: "1",
      queType: "Single Choice",
      noOfQue: "250",
      actions: "Credit Card",
    },
    {
      serialNo: "2",
      queType: "Multiple Choice",
      noOfQue: "150",
      actions: "PayPal",
    },
  ];
  const handleClick = ()=>{
    setIsAddQuiz(true)
  }
  return (
    <div>
      {isAddQuiz ? (
        <AddQuiz />
      ) : (
        <div>
          <div className="w-full  flex justify-end my-2 pr-8">
            <Button onClick={handleClick}>
              <Plus />
            </Button>
          </div>
          <CustomTable headerData={headerData} rowsData={rowData} />
        </div>
      )}
    </div>
  );
};

export default CreateQuiz;
