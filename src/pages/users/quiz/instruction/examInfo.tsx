import { useEffect, useState } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";
import { getQuizById } from "../../apiCall";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const ExamInfoPage = () => {
  const { id }: Params = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState<any>(null);
  const [allData, setAllData] = useState<any>(null);
  const user = useSelector((state: any) => state?.auth?.user);
  const [quizInfo, setQuizInfo] = useState<any>({
    quizId: "",
    quiestionId: "",
  });
  const fetchTest = async () => {
    try {
      const res = await getQuizById(id);
      if (res) {
        setState(res.data);
        setAllData(res);
      }
    } catch (error) {
    } finally {
    }
  };
  useEffect(() => {
    if (id) {
      fetchTest();
    }
    handleGetDataFromSession();
  }, [id]);

  const handleAttempt = () => {
    if (allData?.remainingQuestions < 10) {
      toast("No Enough Questions. Please try another quiz.");
      return;
    }
    if (quizInfo.quiestionId && quizInfo.quizId) {
      navigate(
        `/user/final-test/${state?._id}/${sessionStorage.getItem(
          "attemptedQuestionId"
        )}`
      );
    } else {
      navigate(`/user/final-test/${state?._id}/1`);
      sessionStorage.setItem("attemptedQuestionId", "1");
      sessionStorage.setItem("attemptedQuizId", id);
    }
  };
  const handleGetDataFromSession = () => {
    let attemptedQuestionId = sessionStorage.getItem("attemptedQuestionId");
    let attemptedQuizId = sessionStorage.getItem("attemptedQuizId");

    if (attemptedQuestionId && attemptedQuizId) {
      setQuizInfo({
        quiestionId: attemptedQuestionId,
        quizId: attemptedQuizId,
      });
    }
  };
  return (
    <div>
      <div className="max-h-[88vh] bg-primary sm:p-8 p-4 overflow-y-scroll">
        <div className="bg-secondary shadow-lg rounded-lg sm:p-8 p-2   ">
          <header className="flex justify-between items-center border-b pb-4">
            <h1 className="text-lg font-bold text-btn ">Exam Information</h1>
            <div className="text-sm text-highlight ">
              <p>
                Remaining Time: <span className="font-bold">00:15:00</span>
              </p>
            </div>
          </header>

          <section className="mt-4 space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold">
                Welcome {user?.firstName + " " + user?.lastName}
              </h2>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between items-center">
              <div className="flex justify-between w-full sm:w-auto items-center space-x-4 text-xs sm:text-base">
                <p className="font-semibold">Exam Name:</p>
                <p className="bg-btn text-white rounded-full px-3 py-1">
                  {state?.title}
                </p>
              </div>

              <div className="flex items-center sm:space-x-4 space-x-2 sm:pt-0 pt-2 text-xs sm:text-base sm:justify-between justify-between w-full sm:w-auto">
                <p className="font-semibold">Duration :</p>
                <p className="bg-btn text-white rounded-full px-3 py-1">
                  {" "}
                  15 Minutes
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <ul className="space-y-4 sm:text-base text-xs">
                <li className="flex justify-between items-center ">
                  <p>Total Questions :</p>
                  <p className="bg-btn text-white rounded-full px-3 py-1">10</p>
                </li>
                <li className="flex justify-between items-center">
                  <p>Negative Marking :</p>
                  <p className="bg-btn text-white rounded-full px-3 py-1">NO</p>
                </li>
                <li className="flex justify-between items-center">
                  <p>Marks per Question :</p>
                  <p className="bg-btn text-white rounded-full px-3 py-1">2</p>
                </li>
                <li className="flex justify-between items-center">
                  <p>Total Marks :</p>
                  <p className="bg-btn text-white rounded-full px-3 py-1">20</p>
                </li>
              </ul>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={handleAttempt}
                className="bg-btn text-white px-8 py-3 rounded-full  transition sm:text-base text-xs"
              >
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
