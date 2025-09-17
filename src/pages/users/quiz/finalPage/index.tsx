import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { attemptQuestion, finalSubmit, startQuiz } from "../../apiCall";
import { getToday } from "@/shared/date";
import { goFullScreen } from "@/utils/quiz/screen";
import { useTimer } from "@/hooks/useTimer";
import { useQuizProtection } from "@/hooks/useQuizProtection";
import { useBlockKeys } from "@/hooks/useBlockKeys";

const FinalTestPage: React.FC = () => {
  const [showSide, setShowSide] = useState(true);
  const { ...params } = useParams();
  const navigate = useNavigate();

  const auth = useSelector((state: RootState) => state?.auth);

  const [allData, setAllData] = useState<any>({});
  const [questions, setQuestions] = useState<any[]>([]);

  // Track answers and visited questions
  const [answers, setAnswers] = useState<{ [key: number]: string[] }>({});
  const [visited, setVisited] = useState<Set<number>>(new Set());

  // Timer (15 min = 900s)
  // const { minutes, seconds } = useTimer(15 * 60, () => {
  //   finalSubmitQuiz();
  // });

  // ===================== API CALLS =====================
  const handleStartQuiz = async () => {
    try {
      const res = await startQuiz(params.params);
      setQuestions(res?.attempt?.questions || []);
      setAllData(res?.attempt || {});
      sessionStorage.setItem("id", JSON.stringify(res?.attempt?._id));
    } catch (error) {
      console.error("Error starting quiz:", error);
    }
  };

  const handleSaveAndNext = async () => {
    const currentIndex = parseInt(params.id) - 1;
    const selectedAnswer = answers[currentIndex] || [];

    const payload = {
      questionId: questions[currentIndex]?.questionId?._id,
      attemptId: allData?._id,
      answer: selectedAnswer,
    };

    try {
      await attemptQuestion(payload);
    } catch (error) {
      console.error("Error saving answer:", error);
    }

    setVisited((prev) => new Set(prev).add(currentIndex));

    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      navigate(`/user/final-test/${params.params}/${nextIndex + 1}`);
    } else {
      finalSubmitQuiz();
    }
  };

  const finalSubmitQuiz = async () => {
    let _attemptedId = sessionStorage.getItem("id");
    try {
      await finalSubmit({ attemptId: allData?._id || _attemptedId });
      alert("Your test has been submitted successfully!");
      sessionStorage.clear();
      navigate("/user/test-summary");
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };
  const { minutes, seconds } = useTimer(15, () => finalSubmitQuiz());
  // ===================== HANDLERS =====================
  const handleBack = () => {
    const currentIndex = parseInt(params.id);
    if (currentIndex > 1) {
      navigate(`/user/final-test/${params.params}/${currentIndex - 1}`);
    }
  };

  const handleSelectAnswer = (ans: string, type: string) => {
    const currentIndex = parseInt(params.id) - 1;

    if (type === "single") {
      setAnswers((prev) => ({
        ...prev,
        [currentIndex]: [ans],
      }));
    }
  };

  // ===================== EFFECTS =====================
  useEffect(() => {
    if (questions.length === 0) {
      handleStartQuiz();
    }
  }, []);

  // Track visited questions
  useEffect(() => {
    const currentIndex = parseInt(params.id) - 1;
    setVisited((prev) => new Set(prev).add(currentIndex));
  }, [params.id]);

  // Fullscreen enforcement
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

  // Disable right-click
  useEffect(() => {
    const disableRightClick = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);
    return () => document.removeEventListener("contextmenu", disableRightClick);
  }, []);

  // Block inspect shortcuts
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

  // Warn before leaving
  useEffect(() => {
    const beforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue =
        "Are you sure you want to leave? Your test is not submitted!";
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, []);

  // ===================== RENDER =====================
  const currentIndex = parseInt(params.id) - 1;
  const currentQuestion = questions[currentIndex];
  useQuizProtection(finalSubmitQuiz);
  useBlockKeys();

  return (
    <div>
      <div className="min-h-[100vh] bg-primary flex flex-col  p-6 relative">
        {/* Header Section */}
        <header className="bg-secondary text-btn p-4 rounded-lg flex justify-between gap-4 items-center mb-4">
          <div className="flex sm:flex-row flex-col sm:items-center sm:space-x-2 ">
            <h1 className="text-xs sm:text-lg font-semibold">
              {currentQuestion?.questionId?.category}
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
                {currentQuestion?.questionId?.type}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-red-600 font-semibold">
                Q) {currentQuestion?.questionId?.title}
              </p>
              <hr className="my-4" />

              <div className="space-y-4">
                {/* Options */}
                {currentQuestion?.questionId?.options?.map(
                  (option: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`answer-${params.id}`}
                        className="form-radio"
                        value={option}
                        checked={
                          answers[currentIndex]?.includes(option) || false
                        }
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
                <div className="h-4 w-4 bg-gray-500 rounded-full"></div>
                <span>Not Visited</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-yellow-500 rounded-full"></div>
                <span>Current</span>
              </div>
            </div>

            {/* Navigator */}
            <div className="grid grid-cols-6 gap-2 mb-4">
              {Array.from({ length: questions.length }, (_, i) => (
                <div
                  key={i}
                  onClick={() =>
                    navigate(`/user/final-test/${params.params}/${i + 1}`)
                  }
                  className={`h-10 w-10 flex items-center justify-center rounded-full cursor-pointer
                    ${
                      i === currentIndex
                        ? "bg-yellow-500 text-black"
                        : answers[i]
                        ? "bg-green-500 text-white"
                        : visited.has(i)
                        ? "bg-red-500 text-white"
                        : "bg-gray-300"
                    }`}
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

          <Button
            onClick={() => {
              setAnswers((prev) => {
                const copy = { ...prev };
                delete copy[currentIndex];
                return copy;
              });
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
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
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Final Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinalTestPage;
