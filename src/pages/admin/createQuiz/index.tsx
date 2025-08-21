import CustomTable from "@/components/custom/CustomTable";
import { ChevronLeft, DeleteIcon, PenLine, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddQuiz from "./AddQuiz";
import { useEffect, useState } from "react";
import { getAllQuiz } from "../apiCall";
import LoaderTable from "@/components/custom/LoaderTable";

const CreateQuiz = () => {
  const [isAddQuiz, setIsAddQuiz] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const headerData = [
    { title: "SL No.", key: "serialNo" as const },
    { title: "Quiz Name", key: "name" as const },
    { title: "Price", key: "price" as const },
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
  const fetchQuizes = async () => {
    try {
      setLoading(true);
      const res = await getAllQuiz();

      if (res) {
        let _data = res?.data?.map((item: any, index: number) => ({
          ...item,
          serialNo: index + 1,
          name: item?.title || item?.quizShortDesc?.[0]?.title,
          price: "₹" + (item?.price || 0),
          actions: (
            <div className="flex gap-2">
              <PenLine
                // onClick={() => handleSelect(d)}
                size={20}
                className="cursor-pointer text-yellow-500 hover:text-yellow-700"
              />
              <Trash2
                size={20}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              />
            </div>
          ),
        }));
        setData(_data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAddQuiz) {
      fetchQuizes();
    }
  }, [isAddQuiz]);
  const handleClick = () => {
    setIsAddQuiz(true);
  };
  return (
    <div>
      {isAddQuiz && (
        <div
          className="flex gap-2 items-center mt-2 cursor-pointer"
          onClick={() => setIsAddQuiz(false)}
        >
          <ChevronLeft className="cursor-pointer hover:scale-110" /> Back
        </div>
      )}
      {isAddQuiz ? (
        <AddQuiz />
      ) : (
        <div>
          <div className="w-full  flex justify-end my-2 pr-8">
            <Button onClick={handleClick}>
              <Plus />
            </Button>
          </div>
          {loading ? (
            <LoaderTable />
          ) : (
            <CustomTable headerData={headerData} rowsData={data} />
          )}
        </div>
      )}
    </div>
  );
};

export default CreateQuiz;
