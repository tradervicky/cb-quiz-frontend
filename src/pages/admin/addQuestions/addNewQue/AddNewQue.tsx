import CustomMultiSelect from "@/components/custom/CustomMultiSelect";
import CustomSelect from "@/components/custom/CustomSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { addQuestion, getAdminCategory, getAdminTypes } from "../../apiCall";

// Define the types for the options
interface Option {
  name: string;
  code: string;
}

export const questionTypeOptions: Option[] = [
  { name: "Single Choice", code: "single" },
  { name: "Multiple Choice", code: "multiple" },
  { name: "Mixed Choice", code: "mixed" },
];

const AddNewQue = () => {
  const [types, setTypes] = useState<Option[]>([]);
  const [categories, setCategories] = useState<Option[]>([]);

  const [questionData, setQuestionData] = useState<{
    title: string;
    type: string;
    category: string;
    options: string[];
    answer: string[];
  }>({
    title: "",
    type: "",
    category: "",
    options: ["", "", "", ""], 
    answer: [],
  });
  // title": "Who is the Prime minister of india",
  //   "type": 1,
  //   "typeTitle": "Single choice",
  //   "category": "66b3502cf42ed79eb20860a8",
  //   "categoryTitle": "General Knowledge Questions",
  //   "options": ["Mangal Panday", "Narendra Modi", "Rahul Gandhi", "Amit Shah"],
  //   "answer": "Narendra Modi"

  

  const handleSubmit = async () => {
    addQuestion(questionData)
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setQuestionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOptionChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedOptions = [...questionData.options];
    updatedOptions[index] = e.target.value;
    setQuestionData((prevData) => {
      const updatedAnswer = prevData.answer.filter((ans) =>
        updatedOptions.includes(ans)
      );
      return {
        ...prevData,
        options: updatedOptions,
        answer: updatedAnswer,
      };
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setQuestionData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === "type" && { answer: [] }), 
    }));
  };
  const handleAnsSelectChange = (name: string, value: string | string[]) => {
    setQuestionData((prevData) => {
      const updatedAnswer = Array.isArray(value) ? value : [value]; 
      const updatedData = {
        ...prevData,
        [name]: updatedAnswer,
      };
      console.log("Updated questionData:", updatedData); 
      return updatedData;
    });
  };

  const handleMultiSelectChange = (selectedOptions: string[]) => {
    setQuestionData((prevData) => ({
      ...prevData,
      answer: selectedOptions,
    }));
  };

  const fetchQuestionTypeAndCategory = async () => {
    try {
      const response = await getAdminTypes();
      setTypes(
        response?.data.map((data) => ({
          name: data.title,
          code: data.title,
        }))
      );

      const catResponse = await getAdminCategory();
      setCategories(
        catResponse?.data.map((d) => ({
          name: d.title,
          code: d.title,
        }))
      );
    } catch (error) {
      console.error("Error fetching types or categories:", error);
    }
  };

  useEffect(() => {
    fetchQuestionTypeAndCategory();
  }, []);

  const validOptions = questionData.options.filter((opt) => opt.trim() !== "");

  return (
    <>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 sm:gap-4 sm:p-4 p-2">
        <div>
          <Label>Question Title</Label>
          <Input
            placeholder="Enter Question Title"
            name="title"
            onChange={handleChange}
            value={questionData.title}
          />
        </div>

        <div className="w-full">
          <CustomSelect
            name="type"
            label="Select Question Type"
            style="w-full"
            options={types}
            optionLabel="name"
            optionValue="code"
            onChange={(value) => handleSelectChange("type", value)}
            value={questionData.type}
            placeholder="Select Question Type"
          />
        </div>

        <div className="w-full">
          <CustomSelect
            name="category"
            label="Select Question Category"
            style="w-full"
            options={categories}
            optionLabel="name"
            optionValue="code"
            onChange={(value) => handleSelectChange("category", value)}
            value={questionData.category}
            placeholder="Select Question Category"
          />
        </div>

        {questionData.options.map((option, index) => (
          <div key={index}>
            <Label>Option {index + 1}</Label>
            <Input
              placeholder={`Enter Option ${index + 1}`}
              name={`option${index}`}
              onChange={(e) => handleOptionChange(index, e)}
              value={option}
            />
          </div>
        ))}

        <div className="w-full">
          {questionData.type === "Multiple choice" ? (
            <CustomMultiSelect
              name="answer"
              label="Select Correct Options"
              style="w-full"
              options={validOptions.map((opt) => ({ name: opt, code: opt }))}
              optionLabel="name"
              optionValue="code"
              onChange={handleMultiSelectChange}
              value={questionData.answer}
              placeholder="Select Correct Options"
            />
          ) : (
            <CustomSelect
              name="answer"
              label="Select Correct Option"
              style="w-full"
              options={validOptions.map((opt) => ({ name: opt, code: opt }))}
              optionLabel="name"
              optionValue="code"
              onChange={(value) => handleAnsSelectChange("answer", value)}
              value={questionData.answer[0]}
              placeholder="Select Correct Option"
            />
            
          )}
        </div>
      </div>

      <div className="w-full flex justify-end pr-4">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </>
  );
};

export default AddNewQue;