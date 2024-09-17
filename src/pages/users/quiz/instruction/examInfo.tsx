import React from 'react';

const ExamInfoPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <header className="flex justify-between items-center border-b pb-4">
          <h1 className="text-lg font-bold text-teal-600">
            Exam Information / परीक्षा जानकारी
          </h1>
          <div className="text-sm text-gray-500">
            <p>Remaining Time: <span className="font-bold">00:00:00</span></p>
          </div>
        </header>

        <section className="mt-4 space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold">Welcome / स्वागत Mock user</h2>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <div className="flex items-center space-x-4">
              <p className="font-semibold">Exam Name / परीक्षा का नाम :</p>
              <p className="bg-teal-500 text-white rounded-full px-3 py-1">
                Criminal Laws
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <p className="font-semibold">Duration / अवधि :</p>
              <p className="bg-teal-500 text-white rounded-full px-3 py-1">
                2 Hour(s) 30 Minute(s)
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <p>Total Questions / कुल सवाल:</p>
                <p className="bg-teal-500 text-white rounded-full px-3 py-1">
                  100
                </p>
              </li>
              <li className="flex justify-between items-center">
                <p>Negative Marking / नकारात्मक अंकन:</p>
                <p className="bg-teal-500 text-white rounded-full px-3 py-1">
                  NO
                </p>
              </li>
              <li className="flex justify-between items-center">
                <p>Marks per Question / प्रति प्रश्न का मार्क:</p>
                <p className="bg-teal-500 text-white rounded-full px-3 py-1">
                  2
                </p>
              </li>
              <li className="flex justify-between items-center">
                <p>Can See Score After Attempt / प्रयास के बाद स्कोर देख सकते हैं:</p>
                <p className="bg-teal-500 text-white rounded-full px-3 py-1">
                  YES
                </p>
              </li>
              <li className="flex justify-between items-center">
                <p>Total Marks / पूर्णांक:</p>
                <p className="bg-teal-500 text-white rounded-full px-3 py-1">
                  200
                </p>
              </li>
              <li className="flex justify-between items-center">
                <p>Passing Marks / उत्तीर्ण अंक:</p>
                <p className="bg-teal-500 text-white rounded-full px-3 py-1">
                  As per the category
                </p>
              </li>
              <li className="flex justify-between items-center">
                <p>When You Can See Detail Result / कब आप विस्तृत परिणाम देख सकते हैं:</p>
                <p className="bg-teal-500 text-white rounded-full px-3 py-1">
                  After Finishing Exam
                </p>
              </li>
            </ul>
          </div>

          <div className="flex justify-center mt-8">
            <button className="bg-teal-600 text-white px-8 py-3 rounded-full hover:bg-teal-700 transition">
              ATTEMPT NOW / अब परीक्षा दें
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExamInfoPage;
