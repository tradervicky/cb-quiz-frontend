import CustomAlert from "@/components/custom/CustomAlert";
import { Edit, Trash2 } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteQuestion } from "../apiCall";
import { toast } from "sonner";

interface Option {
  text: string;
  isCorrect: boolean;
}

interface QuestionProps {
  question: string;
  options: Option[];
  allowMultiple: boolean;
  questionNumber: number;
  category: string;
  type: string;
  answer: [];
  id: string;
  setIsAddQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSelected: React.Dispatch<React.SetStateAction<boolean | string>>;
  fetchQuestions: () => void;
}

const SingleQuestion: React.FC<QuestionProps> = ({
  question,
  answer,
  options,
  category,
  type,
  id,
  setIsAddQuestion,
  setIsSelected,
  fetchQuestions,
}) => {
  const navigate = useNavigate();
  const correctOptions = options
    .map((option, index) =>
      option.isCorrect ? String.fromCharCode(65 + index) : ""
    )
    .filter((char) => char !== "")
    .join(", ");
  const handleNavigate = () => {
    navigate(`/quiz/questions?id=${id}`);
    setIsAddQuestion(true);
  };
  const handleDelete = async () => {
    try {
      const res = await deleteQuestion(id);
      if (res.status) {
        toast("Question deleted successfully");
        fetchQuestions();
      }
    } catch (error) {
    } finally {
      setIsSelected(false);
    }
  };
  return (
    <div className="p-4 bg-primary rounded-lg shadow-md mb-6">
      <div className="flex gap-2 justify-between">
        <h3 className="text-btn text-lg font-semibold mb-4">{question}</h3>
        <div className="text-sm flex gap-2 font-normal">
          <Edit size={20} className="cursor-pointer" onClick={handleNavigate} />
          <CustomAlert
            title="Delete Question"
            description="Are you sure you want to delete this question?"
            onContinue={handleDelete}
          >
            <Trash2
              onClick={() => setIsSelected(id)}
              size={20}
              className="cursor-pointer text-red-500 hover:text-red-600 ease-in-out duration-300 "
            />
          </CustomAlert>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        {options.map((option, index) => (
          <div key={index} className="p-2 rounded-lg bg-secondary text-btn">
            {String.fromCharCode(65 + index)}. {option}
          </div>
        ))}
      </div>
      <div className="flex justify-between gap-2">
        <p className="bg-secondary px-4 py-1 rounded">
          Correct Ans:{" "}
          {answer.map((d, i) => (
            <span>
              {d}
              {type === "Multiple choice" && i !== answer.length - 1 && ", "}
            </span>
          ))}
        </p>
        <p className="bg-secondary px-4 py-1 rounded">Category: {category}</p>
        <p className="bg-secondary px-4 py-1 rounded">Question Type: {type}</p>
      </div>
    </div>
  );
};

export default SingleQuestion;
