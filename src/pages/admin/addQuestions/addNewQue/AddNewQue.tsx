import CustomMultiSelect from "@/components/custom/CustomMultiSelect";
import CustomSelect from "@/components/custom/CustomSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import {
  addQuestion,
  deleteQuestion,
  getAdminCategory,
  getAdminTypes,
  getAllQuiz,
  getQuestionById,
  updateQuestion,
  uploadQuestion,
} from "../../apiCall";
import { SAMPLE_UPLOAD_FILE } from "@/shared/constants";
import Loader from "@/components/custom/Loader";
import LoaderOverlay from "@/components/custom/LoaderOverlay";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
interface Option {
  name: string;
  code: string;
}

export const questionTypeOptions: Option[] = [
  { name: "Single Choice", code: "single" },
  { name: "Multiple Choice", code: "multiple" },
  { name: "Mixed Choice", code: "mixed" },
];
export const quizFor: Option[] = [
  { name: "Paid", code: "paid" },
  { name: "Free", code: "free" },
];

const AddNewQue = () => {
  const [types, setTypes] = useState<Option[]>([]);
  const [categories, setCategories] = useState<Option[]>([]);
  const [searchParam] = useSearchParams();
  const [questionData, setQuestionData] = useState<{
    title: string;
    type: string;
    category: string;
    options: string[];
    answer: string[];
    QuestionFor: string;
    quizId: string;
  }>({
    title: "",
    type: "",
    category: "",
    options: ["", "", "", ""],
    answer: [],
    QuestionFor: "paid",
    quizId: "",
  });
  const [quizOption, setQuizOption] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchQuiz = async () => {
    const res = await getAllQuiz();
    if (res) {
      let _option = res?.data?.map((item: any) => ({
        name: item?.title || item?.quizShortDesc?.[0]?.title,
        code: item?._id,
      }));
      setQuizOption(_option);
    }
  };

  const handleSubmit = async () => {
    if (searchParam.get("id")) {
      const res = await updateQuestion(
        questionData,
        searchParam.get("id") || ""
      );
    } else {
      await addQuestion(questionData);
    }
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
    fetchQuiz();
  }, []);

  const validOptions = questionData.options.filter((opt) => opt.trim() !== "");
  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return; // safety check

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await uploadQuestion(formData);

      if (res?.status) {
        // success
        toast("File uploaded successfully");
      } else {
        toast(res?.msg || "Upload failed");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast("Something went wrong while uploading the file");
    } finally {
      setLoading(false); // always stop loader
    }
  };
  const fetchSingleQuestion = async () => {
    try {
      const res = await getQuestionById(searchParam.get("id"));
      console.log(res);
      if (res && res.data) {
        const _data = {
          title: res.data.title || "",
          type: res.data.type || "",
          category: res.data.category || "",
          options: Array.isArray(res.data.options)
            ? res.data.options
            : ["", "", "", ""], // fallback to 4 empty options
          answer: Array.isArray(res.data.answer) ? res.data.answer : [],
          QuestionFor: res.data.QuestionFor || "paid",
          quizId: res.data.quizId || "",
        };
        setQuestionData(_data);
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };
  useEffect(() => {
    fetchSingleQuestion();
  }, [searchParam.get("id")]);

  return (
    <>
      <LoaderOverlay visible={loading} />
      <div className="relative">
        <div className="absolute -top-10 right-4 flex flex-col ">
          <div>
            <Label>Upload File (Add Questions)</Label>
            <Input
              type="file"
              placeholder="Enter Question Title"
              onChange={(e) => handleUploadFile(e)}
            />
          </div>
          <a
            className="absolute top-1 right-2 text-blue-500 underline italic text-xs"
            target="_blank"
            href={SAMPLE_UPLOAD_FILE}
          >
            Sample File
          </a>
        </div>

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

          {questionData?.options?.map((option, index) => (
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
                options={validOptions.map((opt) => ({
                  name: opt,
                  code: opt,
                }))}
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
                options={validOptions.map((opt) => ({
                  name: opt,
                  code: opt,
                }))}
                optionLabel="name"
                optionValue="code"
                onChange={(value) => handleAnsSelectChange("answer", value)}
                value={questionData.answer[0]}
                placeholder="Select Correct Option"
              />
            )}
          </div>

          <div className="w-full">
            <CustomSelect
              name="quizId"
              label="Select Quiz"
              style="w-full"
              options={quizOption}
              optionLabel="name"
              optionValue="code"
              onChange={(value) => handleSelectChange("quizId", value)}
              value={questionData.quizId}
              placeholder="Select Quiz"
            />
          </div>

          <div className="w-full">
            <CustomSelect
              name="QuestionFor"
              label="Paid or Free"
              style="w-full"
              options={quizFor}
              optionLabel="name"
              optionValue="code"
              disabled
              onChange={(value) => handleSelectChange("QuestionFor", value)}
              value={"paid"}
              placeholder="Select Paid/Free"
            />
          </div>
        </div>

        <div className="w-full flex justify-end pr-4">
          <Button onClick={handleSubmit}>
            {searchParam.get("id") ? "Update" : "Submit"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddNewQue;
