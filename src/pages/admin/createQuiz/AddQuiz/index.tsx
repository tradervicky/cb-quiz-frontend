import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";
import React from "react";

const AddQuiz = () => {
  return (
    <>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 sm:gap-4 sm:p-4 p-2">
        <div>
          <Label>Instructor Name</Label>
          <Input placeholder="Enter Instructor Name" />
        </div>
        <div>
          <Label>Instructor Bio</Label>
          <Input placeholder="Enter Instructor bio" />
        </div>
        <div>
          <Label>Quiz Short Description</Label>
          <Input placeholder="Enter short Title" className="mb-4" />
          <Input placeholder="Enter short description" className="mb-4" />
          <div>
            <Input placeholder="Enter short Title" className="mb-4" />
            <div className="flex gap-2">
          <Input placeholder="Enter short description" className="mb-4" />
          <Button variant={"outline"}>
              <Minus />
            </Button>
          </div>
          </div>
          
          <div className="flex  justify-end">
            <Button variant={"outline"}>
              <Plus />
            </Button>
          </div>
        </div>
        <div>
          <Label>Quiz Full Description</Label>
          <Input placeholder="Enter Full Title" className="mb-4" />
          <Input placeholder="Enter Full description" className="mb-4" />   
          <div>
          <Input placeholder="Enter Full Title" className="mb-4" />
          <div className="flex gap-2">
          <Input placeholder="Enter Full description" className="mb-4" />
          <Button variant={"outline"}>
              <Minus />
            </Button>
          </div>
          </div>
          <div className="flex  justify-end">
            <Button variant={"outline"}>
              <Plus />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end pr-4">
        <Button>Submit</Button>
      </div>
    </>
  );
};

export default AddQuiz;
