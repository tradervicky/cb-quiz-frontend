import React from 'react';
import Header from '../../header';

const ExamInfoPage = () => {
  return (
    <div>

    <Header/>
    <div className="min-h-[91.5vh] bg-primary sm:p-8 p-4">
      <div className="bg-secondary shadow-lg rounded-lg sm:p-8 p-2   ">
        <header className="flex justify-between items-center border-b pb-4">
          <h1 className="text-lg font-bold text-btn ">
            Exam Information 
          </h1>
          <div className="text-sm text-highlight ">
            <p>Remaining Time: <span className="font-bold">00:00:00</span></p>
          </div>
        </header>

        <section className="mt-4 space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold">Welcome Mock user</h2>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <div className="flex justify-between w-full sm:w-auto items-center space-x-4 text-xs sm:text-base">
              <p className="font-semibold">Exam Name:</p>
              <p className="bg-btn text-white rounded-full px-3 py-1">
                Criminal Laws
              </p>
            </div>

            <div className="flex items-center sm:space-x-4 space-x-2 sm:pt-0 pt-2 text-xs sm:text-base sm:justify-between justify-between w-full sm:w-auto">
              <p className="font-semibold">Duration :</p>
              <p className="bg-btn text-white rounded-full px-3 py-1">
                2 Hour(s) 30 Minute(s)
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <ul className="space-y-4 sm:text-base text-xs">
              <li className="flex justify-between items-center ">
                <p>Total Questions :</p>
                <p className="bg-btn text-white rounded-full px-3 py-1">
                  100
                </p>
              </li>
              <li className="flex justify-between items-center">
                <p>Negative Marking :</p>
                <p className="bg-btn text-white rounded-full px-3 py-1">
                  NO
                </p>
              </li>
              <li className="flex justify-between items-center">
                <p>Marks per Question :</p>
                <p className="bg-btn text-white rounded-full px-3 py-1">
                  2
                </p>
              </li>
              <li className="flex justify-between items-center">
                <p>Can See Score After Attempt :</p>
                <p className="bg-btn text-white rounded-full px-3 py-1">
                  YES
                </p>
              </li>
              <li className="flex justify-between items-center">
                <p>Total Marks :</p>
                <p className="bg-btn text-white rounded-full px-3 py-1">
                  200
                </p>
              </li>
              <li className="flex justify-between items-center">
                <p>Passing Marks :</p>
                <p className="bg-btn text-white rounded-full px-3 py-1">
                  As per the category
                </p>
              </li>
              <li className="flex justify-between items-center">
                <p>When You Can See Detail Result :</p>
                <p className="bg-btn text-white rounded-full px-3 py-1">
                  After Finishing Exam
                </p>
              </li>
            </ul>
          </div>

          <div className="flex justify-center mt-8">
            <button className="bg-btn text-white px-8 py-3 rounded-full  transition sm:text-base text-xs">
              ATTEMPT NOW 
            </button>
          </div>
        </section>
      </div>
    </div>
    </div>
  );
};

export default ExamInfoPage;
