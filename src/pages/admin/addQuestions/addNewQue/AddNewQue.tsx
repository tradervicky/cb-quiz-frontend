import CustomMultiSelect from "@/components/custom/CustomMultiSelect";
import CustomSelect from "@/components/custom/CustomSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { getAdminCategory, getAdminTypes } from "../../apiCall";

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
  // State for types and categories fetched from the API
  const [types, setTypes] = useState<Option[]>([]);
  const [categories, setCategories] = useState<Option[]>([]);

  // State to manage question data
  const [questionData, setQuestionData] = useState<{
    title: string;
    type: string;
    typeTitle: string;
    category: string;
    categoryTitle: string;
    options: string[];
    answer: string[];
  }>({
    title: "",
    type: "",
    typeTitle: "",
    category: "",
    categoryTitle: "",
    options: ["", "", "", ""], // Predefined for four options
    answer: [],
  });

  // Function to handle form submission
  const handleSubmit = async () => {
    // Handle form submission here
    console.log("Submitted Question Data: ", questionData);
  };

  // Function to handle the changes in inputs dynamically
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setQuestionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle changes in options input fields
  const handleOptionChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedOptions = [...questionData.options];
    updatedOptions[index] = e.target.value;
    setQuestionData((prevData) => ({
      ...prevData,
      options: updatedOptions,
    }));
  };

  // Function to handle changes for select components
  const handleSelectChange = (name: string, value: string) => {
    setQuestionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle multi-select changes
  const handleMultiSelectChange = (selectedOptions: string[]) => {
    setQuestionData((prevData) => ({
      ...prevData,
      answer: selectedOptions,
    }));
  };

  // Fetching types and categories from API
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

  // Fetch data on component mount
  useEffect(() => {
    fetchQuestionTypeAndCategory();
  }, []);
console.log(questionData)
  return (
    <>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 sm:gap-4 sm:p-4 p-2">
        {/* Question Title */}
        <div>
          <Label>Question Title</Label>
          <Input
            placeholder="Enter Question Title"
            name="title"
            onChange={handleChange}
            value={questionData.title}
          />
        </div>

        {/* Question Type Selection */}
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
            styleOption="text-blue-600"
          />
        </div>

        {/* Question Category Selection */}
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
            styleOption="text-blue-600"
          />
        </div>

        {/* Options Input Fields */}
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

        {/* Correct Answer Selection */}
        <div className="w-full">
          {questionData.type === "Multiple Choice" ? (
            <CustomMultiSelect
              name="answer"
              label="Select Correct Options"
              style="w-full"
              options={questionTypeOptions}
              optionLabel="name"
              optionValue="code"
              onChange={handleMultiSelectChange}
              value={questionData.answer}
              placeholder="Select Correct Options"
              styleOption="text-blue-600"
            />
          ) : (
            <CustomSelect
              name="answer"
              label="Select Correct Option"
              style="w-full"
              options={questionTypeOptions}
              optionLabel="name"
              optionValue="code"
              onChange={(value) => handleSelectChange("answer", value)}
              value={questionData.answer[0] || ""}
              placeholder="Select Correct Option"
              styleOption="text-blue-600"
            />
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="w-full flex justify-end pr-4">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </>
  );
};

export default AddNewQue;
