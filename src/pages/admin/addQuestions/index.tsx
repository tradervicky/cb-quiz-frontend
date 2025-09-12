import React, { useEffect, useState } from "react";
import SingleQuestion from "./singleQuestion";
import CustomSelect from "@/components/custom/CustomSelect";
import AddNewQue from "./addNewQue/AddNewQue";
import { getAllQuestions } from "../apiCall";
import { useNavigate, useSearchParams } from "react-router-dom";

//select options

interface CountryOption {
  name: string;
  code: string;
}

export const countryOptions: CountryOption[] = [
  { name: "United States", code: "US" },
  { name: "Canada", code: "CA" },
  { name: "United Kingdom", code: "GB" },
  { name: "Australia", code: "AU" },
  { name: "Germany", code: "DE" },
];

const AddQuestions = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [isAddQuestion, setIsAddQuestion] = useState(false);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  console.log(searchParam);
  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    console.log("Selected Country Code:", value);
  };
  const fetchQuestions = async () => {
    let _payload = {
      page: 2,
      limit: 10,
      filter: "",
      search: "",
    };
    const response = await getAllQuestions(_payload);
    setQuestions(response?.Allquestions);
  };
  useEffect(() => {
    if (!isAddQuestion) {
      fetchQuestions();
    }
  }, [isAddQuestion]);

  return (
    <div>
      <div className="flex justify-between px-6 pt-2">
        <div className="flex gap-4 pl-4 pt-2 pb-4">
          <p
            onClick={() => {
              setIsAddQuestion(false);
              navigate("/quiz/questions");
            }}
            className={`${
              !isAddQuestion && "border-highlight border-b-[4px]"
            } cursor-pointer  rounded-lg text-medium font-medium text-highlight`}
          >
            Questions
          </p>
          <p
            onClick={() => {
              setIsAddQuestion(true);
              navigate("/quiz/questions");
            }}
            className={`${
              isAddQuestion && "border-highlight border-b-[4px]"
            } cursor-pointer  rounded-lg text-medium font-medium text-highlight`}
          >
            Add questions
          </p>
        </div>
        {!isAddQuestion && (
          <CustomSelect
            options={countryOptions}
            optionLabel="name"
            optionValue="code"
            onChange={handleCountryChange}
            value={selectedCountry}
            placeholder="Choose a country"
            style="w-[200px]"
            styleOption="text-blue-600"
          />
        )}
      </div>
      {!isAddQuestion ? (
        <div className="grid grid-cols-2 gap-4 px-4 overflow-y-auto h-[82vh] ">
          {questions.map((q, index) => (
            <SingleQuestion
              key={index}
              question={q.title}
              options={q.options}
              category={q.category}
              type={q.type}
              id={q._id}
              answer={q.answer}
              setIsAddQuestion={setIsAddQuestion}
            />
          ))}
        </div>
      ) : (
        <AddNewQue />
      )}
    </div>
  );
};

export default AddQuestions;
