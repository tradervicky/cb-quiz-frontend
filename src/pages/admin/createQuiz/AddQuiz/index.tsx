import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import { addQuiz } from "../../apiCall";
import { useSelector } from "react-redux";

interface Description {
  title: string;
  content: string;
}

const AddQuiz = () => {
  const state = useSelector((state: any) => state?.auth?.user);
  console.log(state);
  // State for Instructor Name, Bio, Short Descriptions, and Full Descriptions
  const [instructorName, setInstructorName] = useState<string>(
    state?.name || ""
  );
  const [title, setTitle] = useState<string>("");
  const [instructorBio, setInstructorBio] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [shortDescriptions, setShortDescriptions] = useState<Description[]>([
    { title: "", content: "" },
  ]);
  const [fullDescriptions, setFullDescriptions] = useState<Description[]>([
    { title: "", content: "" },
  ]);

  // Handler functions for adding/removing short and full descriptions
  const handleAddShortDescription = () => {
    setShortDescriptions([...shortDescriptions, { title: "", content: "" }]);
  };

  const handleRemoveShortDescription = (index: number) => {
    const updatedDescriptions = shortDescriptions.filter(
      (_, idx) => idx !== index
    );
    setShortDescriptions(updatedDescriptions);
  };

  const handleAddFullDescription = () => {
    setFullDescriptions([...fullDescriptions, { title: "", content: "" }]);
  };

  const handleRemoveFullDescription = (index: number) => {
    const updatedDescriptions = fullDescriptions.filter(
      (_, idx) => idx !== index
    );
    setFullDescriptions(updatedDescriptions);
  };

  // Handler for form submission
  const handleSubmit = async () => {
    // Collect all data and handle form submission here
    const quizData = {
      title,
      instructorName,
      instructorBio,
      quizShortDesc: shortDescriptions,
      quizFullDesc: fullDescriptions,
      price,
    };
    const response = await addQuiz(quizData);
    console.log(response);
  };

  return (
    <>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 sm:gap-4 sm:p-4 p-2 sm:pb-0pb-0">
        {/* Instructor Name and Bio */}
        <div>
          <Label>Quiz Title</Label>
          <Input
            placeholder="Enter Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Label>Instructor Name</Label>
          <Input
            placeholder="Enter Instructor Name"
            value={instructorName}
            onChange={(e) => setInstructorName(e.target.value)}
          />
        </div>
        <div>
          <Label>Instructor Bio</Label>
          <Input
            placeholder="Enter Instructor bio"
            value={instructorBio}
            onChange={(e) => setInstructorBio(e.target.value)}
          />
        </div>
        <div>
          <Label>Quiz Price</Label>
          <Input
            placeholder="Enter Price of the Quiz"
            value={price}
            type="number"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Short Descriptions */}
        <div>
          <Label>Quiz Short Description</Label>
          {shortDescriptions.map((desc, index) => (
            <div key={index} className="mb-4">
              <Input
                placeholder="Enter short Title"
                className="mb-2"
                value={desc.title}
                onChange={(e) => {
                  const updatedDescriptions = [...shortDescriptions];
                  updatedDescriptions[index].title = e.target.value;
                  setShortDescriptions(updatedDescriptions);
                }}
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Enter short description"
                  className="flex-1 mb-2"
                  value={desc.content}
                  onChange={(e) => {
                    const updatedDescriptions = [...shortDescriptions];
                    updatedDescriptions[index].content = e.target.value;
                    setShortDescriptions(updatedDescriptions);
                  }}
                />
                {shortDescriptions.length > 1 && (
                  <Button
                    variant={"outline"}
                    onClick={() => handleRemoveShortDescription(index)}
                  >
                    <Minus />
                  </Button>
                )}
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <Button variant={"outline"} onClick={handleAddShortDescription}>
              <Plus />
            </Button>
          </div>
        </div>

        {/* Full Descriptions */}
        <div>
          <Label>Quiz Full Description</Label>
          {fullDescriptions.map((desc, index) => (
            <div key={index} className="mb-4">
              <Input
                placeholder="Enter Full Title"
                className="mb-2"
                value={desc.title}
                onChange={(e) => {
                  const updatedDescriptions = [...fullDescriptions];
                  updatedDescriptions[index].title = e.target.value;
                  setFullDescriptions(updatedDescriptions);
                }}
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Enter Full description"
                  className="flex-1 mb-2"
                  value={desc.content}
                  onChange={(e) => {
                    const updatedDescriptions = [...fullDescriptions];
                    updatedDescriptions[index].content = e.target.value;
                    setFullDescriptions(updatedDescriptions);
                  }}
                />
                {fullDescriptions.length > 1 && (
                  <Button
                    variant={"outline"}
                    onClick={() => handleRemoveFullDescription(index)}
                  >
                    <Minus />
                  </Button>
                )}
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <Button variant={"outline"} onClick={handleAddFullDescription}>
              <Plus />
            </Button>
          </div>
        </div>
      </div>
      {/* <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 sm:gap-4 sm:pl-4 pl-2">
        
      </div> */}

      {/* Submit Button */}
      <div className="w-full flex justify-end pr-4">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </>
  );
};

export default AddQuiz;
