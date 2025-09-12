import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useTimer from "@/hooks/useTimer";
import { useNavigate, useParams } from "react-router-dom";
import { attemptQuestion, finalSubmit, startQuiz } from "../../apiCall";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getToday } from "@/shared/date";
import { goFullScreen } from "@/utils/quiz/screen";
const FinalTestPage: React.FC = () => {
  const [showSide, setShowSide] = useState(true);
  const { ...params } = useParams();
  const auth = useSelector((state: RootState) => state?.auth);
  const [allData, setAllData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const { minutes, seconds } = useTimer(15 * 60, () => {});
  const [answer, setAnswer] = useState<[string]>([""]);
  const handleStartQuiz = async () => {
    try {
      const res = await startQuiz(params.params);
      setQuestions(res?.attempt?.questions);
      setAllData(res?.attempt);
    } catch (error) {}
  };
  useEffect(() => {
    if (questions?.length === 0) {
      handleStartQuiz();
    }
  }, []);
  const handleSaveAndNext = async () => {
    let _payload = {
      questionId: questions[parseInt(params.id) - 1]?.questionId?._id,
      attemptId: allData?._id,
      answer: answer,
    };
    const res = await attemptQuestion(_payload);
    // if (parseInt(params.id) === questions.length) {
    //   navigate(`/user/final-test/${params.params}/1`);
    // } else {
    navigate(`/user/final-test/${params.params}/${parseInt(params.id) + 1}`);
    // }
  };
  const handleBack = () => {
    if (parseInt(params.id) === 1) {
      return;
    } else {
      navigate(`/user/final-test/${params.params}/${parseInt(params.id) - 1}`);
    }
  };

  const handleSelectAnswer = async (ans: string, type: string) => {
    if (type === "single") {
      setAnswer([ans]);
    }
  };
  const finalSubmitQuiz = async () => {
    let _payload = { attemptId: allData?._id };
    const response = await finalSubmit(_payload);
  };
  useEffect(() => {
    const onFullScreenChange = () => {
      if (!document.fullscreenElement) {
        alert("You must stay in full screen during the test!");
        goFullScreen();
      }
    };
    document.addEventListener("fullscreenchange", onFullScreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullScreenChange);
  }, []);
  useEffect(() => {
    const disableRightClick = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);
    return () => document.removeEventListener("contextmenu", disableRightClick);
  }, []);
  useEffect(() => {
    const disableRightClick = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);
    return () => document.removeEventListener("contextmenu", disableRightClick);
  }, []);
  useEffect(() => {
    const blockKeys = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey &&
          e.shiftKey &&
          (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", blockKeys);
    return () => document.removeEventListener("keydown", blockKeys);
  }, []);
  useEffect(() => {
    const beforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue =
        "Are you sure you want to leave? Your test is not submitted!";
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, []);

  return (
    <div>
      <div className="min-h-[88vh] bg-primary flex flex-col  p-6 relative">
        {/* Header Section */}
        <header className="bg-secondary text-btn p-4 rounded-lg flex justify-between gap-4 items-center mb-4">
          <div className="flex sm:flex-row flex-col sm:items-center sm:space-x-2 ">
            <h1 className="text-xs sm:text-lg font-semibold">
              {questions[parseInt(params.id) - 1]?.questionId?.category}
            </h1>
            <span className="text-xs sm:text-lg mt-2 sm:mt-0">
              {getToday()}
            </span>
          </div>
          <div className="flex sm:flex-row flex-col sm:items-center sm:space-x-2 ">
            <p className="text-xs sm:text-sm font-semibold sm:font-bold ">
              Remaining Time
            </p>
            <span className=" text-xs sm:text-lg mt-2 sm:mt-0">
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </span>
          </div>

          <div className="flex sm:flex-row flex-col sm:items-center space-x-2 ">
            <div className="bg-green-500 px-3 py-1 rounded-full text-xs">
              Online
            </div>
            <div className="text-xs sm:text-xs  w-full mt-1 sm:mt-0">
              {auth?.user?.firstName + " " + auth?.user?.lastName}
            </div>
          </div>
        </header>

        <div className="flex flex-col md:flex-row md:space-x-6">
          {/* Question Section */}
          <section className="bg-secondary shadow-md p-6 rounded-lg flex-1 h-[60vh] overflow-y-scroll">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Question {params.id}</h2>
              <div className="text-sm text-gray-600">
                {questions[parseInt(params.id) - 1]?.questionId?.type}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-red-600 font-semibold">
                Q) {questions[parseInt(params.id) - 1]?.questionId?.title}
              </p>
              <hr className="my-4" />

              <div className="space-y-4">
                {/* Options */}
                {questions[parseInt(params.id) - 1]?.questionId?.options?.map(
                  (option, index) => (
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="answer"
                        className="form-radio"
                        value={option}
                        onChange={(e) =>
                          handleSelectAnswer(e.target.value, "single")
                        }
                      />
                      <label>{option}</label>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>

          {/* Sidebar */}

          <aside
            className={`bg-secondary ${
              !showSide ? "absolute right-0 -top-20 ml-4" : "hidden"
            } sm:block p-4 rounded-lg shadow-md w-full md:w-1/3 mt-6 md:mt-0 sm:overflow-y-auto sm:h-[60vh]`}
          >
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
              {Array.from({ length: questions.length || 10 }, (_, i) => (
                <div
                  onClick={() =>
                    navigate(`/user/final-test/${params.params}/${i + 1}`)
                  }
                  key={i + 1}
                  className={`h-10 w-10 flex items-center justify-center rounded-full 
                ${
                  i === parseInt(params.id) - 1
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-300"
                } cursor-pointer`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* Bottom Action Buttons */}
        <div className="mt-6 flex sm:flex-row flex-col justify-center gap-4 sm:gap-4 sm:items-center">
          <Button
            disabled={parseInt(params.id) === 1}
            onClick={handleBack}
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
          >
            Back
          </Button>

          <Button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Clear
          </Button>

          <Button
            onClick={handleSaveAndNext}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Next
          </Button>
          <Button
            onClick={finalSubmitQuiz}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Final Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinalTestPage;
