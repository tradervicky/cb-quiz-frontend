import React, { useState } from 'react';
import Header from '../../header';
const FinalTestPage: React.FC = () => {
  const [showSide, setShowSide] = useState(true)
  return (
    <div>
      <Header/>
    <div className="min-h-[91.5vh] bg-primary flex flex-col  p-6 relative">
      {/* Header Section */}
      <header className="bg-secondary text-btn p-4 rounded-lg flex justify-between gap-4 items-center mb-4">
        <div className="flex sm:flex-row flex-col sm:items-center sm:space-x-2 ">
          <h1 className="text-xs sm:text-lg font-semibold">EXAM_Name</h1>
          <span className="text-xs sm:text-lg mt-2">16/09/2024</span>
        </div>
        <div className='flex sm:flex-row flex-col sm:items-center sm:space-x-2 '>
        <p className="text-xs sm:text-sm font-semibold sm:font-bold ">
          Remaining Time  
        </p>
        <span className=" text-xs sm:text-lg mt-2 ">02:29:54</span>
        </div>
       
        <div className="flex sm:flex-row flex-col sm:items-center space-x-2 ">
          <div className="bg-green-500 px-3 py-1 rounded-full text-xs">Online</div>
          <div className="text-xs sm:text-xs  w-full mt-1">Mock_user</div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row md:space-x-6">
        {/* Question Section */}
        <section className="bg-secondary shadow-md p-6 rounded-lg flex-1">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Question 001</h2>
            <div className="text-sm text-gray-600">SINGLE CHOICE QUESTIONS</div>
          </div>

          <div className="mt-4">
            <p className="text-red-600 font-semibold">
              Q) When the offense of kidnapping is committed with the intention to cause wrongful
              confinement or to put the person in fear of death or hurt, it is classified as:
            </p>
            <hr className="my-4" />

            <div className="space-y-4">
              {/* Options */}
              <div className="flex items-center space-x-2">
                <input type="radio" name="answer" className="form-radio" />
                <label>Simple kidnapping</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" name="answer" className="form-radio" />
                <label>Kidnapping for ransom</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" name="answer" className="form-radio" />
                <label>Kidnapping to compel marriage</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" name="answer" className="form-radio" />
                <label>Kidnapping with murder</label>
              </div>
            </div>
          </div>
        </section>

        {/* Sidebar */}

        
        <aside className={`bg-secondary ${!showSide ? "absolute right-0 -top-20 ml-4" : "hidden"} sm:block p-4 rounded-lg shadow-md w-full md:w-1/3 mt-6 md:mt-0 sm:overflow-y-auto sm:h-[70vh]`}>
        {/* Status Key */}
        <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 bg-green-500 rounded-full"></div>
              <span>Answered</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 bg-red-500 rounded-full"></div>
              <span>Visited</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 bg-blue-500 rounded-full"></div>
              <span>Marked for Review</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 bg-gray-500 rounded-full"></div>
              <span>Not Visited</span>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-2 mb-4">
            {/* Question Navigator */}
            {Array.from({ length: 100 }, (_, i) => (
              <div
                key={i + 1}
                className={`h-10 w-10 flex items-center justify-center rounded-full 
                ${i === 0 ? 'bg-yellow-500 text-black' : 'bg-gray-300'} cursor-pointer`}
              >
                {i + 1}
              </div>
            ))}
          </div>

          
        </aside>
      </div>

      {/* Bottom Action Buttons */}
      <div className="mt-6 flex sm:flex-row flex-col justify-center gap-4 sm:gap-4 sm:items-center">
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
          Save
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Save & Next
        </button>
        <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600">
          Save & Mark as Review
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          Clear
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Finish Exam
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
          Instruction
        </button>
      </div>
    </div>
    </div>
  );
};

export default FinalTestPage;
