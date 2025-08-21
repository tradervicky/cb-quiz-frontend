import React, { useEffect, useState } from "react";
import SingleQuestion from "./singleQuestion";
import CustomSelect from "@/components/custom/CustomSelect";
import AddNewQue from "./addNewQue/AddNewQue";
import { getAllQuestions } from "../apiCall";
// const questions = [
//   {
//     question: 'What is the capital of France?',
//     options: [
//       { text: 'Berlin', isCorrect: false },
//       { text: 'Madrid', isCorrect: false },
//       { text: 'Paris', isCorrect: true },
//       { text: 'Rome', isCorrect: false },
//     ],
//     allowMultiple: false,
//   },
//   {
//     question: 'Which planet is known as the Red Planet?',
//     options: [
//       { text: 'Earth', isCorrect: false },
//       { text: 'Mars', isCorrect: true },
//       { text: 'Jupiter', isCorrect: false },
//       { text: 'Venus', isCorrect: false },
//     ],
//     allowMultiple: false,
//   },
//   {
//     question: 'Which is the largest ocean on Earth?',
//     options: [
//       { text: 'Atlantic Ocean', isCorrect: false },
//       { text: 'Indian Ocean', isCorrect: false },
//       { text: 'Arctic Ocean', isCorrect: false },
//       { text: 'Pacific Ocean', isCorrect: true },
//     ],
//     allowMultiple: false,
//   },
//   {
//     question: 'Who developed the theory of relativity?',
//     options: [
//       { text: 'Isaac Newton', isCorrect: false },
//       { text: 'Albert Einstein', isCorrect: true },
//       { text: 'Galileo Galilei', isCorrect: false },
//       { text: 'Nikola Tesla', isCorrect: false },
//     ],
//     allowMultiple: false,
//   },
//   {
//     question: 'Which is the smallest country in the world by area?',
//     options: [
//       { text: 'Monaco', isCorrect: false },
//       { text: 'Vatican City', isCorrect: true },
//       { text: 'Liechtenstein', isCorrect: false },
//       { text: 'San Marino', isCorrect: false },
//     ],
//     allowMultiple: false,
//   },
//   {
//     question: 'Which state has capital chandigadh?',
//     options: [
//       { text: 'Bihar', isCorrect: false },
//       { text: 'Punjab', isCorrect: true },
//       { text: 'Uttar Pradesh', isCorrect: false },
//       { text: 'Haryana', isCorrect: true },
//     ],
//     allowMultiple: true,
//   },
// ];

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
  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    console.log("Selected Country Code:", value);
  };
  const fetchQuestions = async () => {
    const response = await getAllQuestions();
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
            onClick={() => setIsAddQuestion(false)}
            className={`${
              !isAddQuestion && "border-highlight border-b-[4px]"
            } cursor-pointer  rounded-lg text-medium font-medium text-highlight`}
          >
            Questions
          </p>
          <p
            onClick={() => setIsAddQuestion(true)}
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
              answer={q.answer}
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
