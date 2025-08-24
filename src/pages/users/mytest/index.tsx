import React from "react";
import InstructorTest from "../instructorTest";
import Header from "../header";

const MyTest = () => {
  return (
    <div className="min-h-screen bg-primary">
      <div className="mb-4">
        <Header />
      </div>
      <InstructorTest />
      <InstructorTest />
    </div>
  );
};

export default MyTest;
