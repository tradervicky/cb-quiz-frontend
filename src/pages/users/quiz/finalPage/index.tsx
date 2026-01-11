import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { attemptQuestion, finalSubmit, startQuiz } from "../../apiCall";
import { getToday } from "@/shared/date";
import { goFullScreen } from "@/utils/quiz/screen";
import { useTimer } from "@/hooks/useTimer";
import { useQuizProtection } from "@/hooks/useQuizProtection";
import { useBlockKeys } from "@/hooks/useBlockKeys";
import { toast } from "sonner";

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
  const [isLoading, setIsLoading] = useState(true);

  // Timer
  const { minutes, seconds, timeLeft } = useTimer(15, () => {
    finalSubmitQuiz(true);
  });
  
  // Use ref to access current timeLeft in callbacks without dependency issues
  const timeLeftRef = useRef(timeLeft);
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  // ===================== API CALLS =====================
  const handleStartQuiz = async () => {
    try {
      const res = await startQuiz(params.params);
      const attempt = res?.attempt;
      
      if (!attempt) {
        toast.error("Failed to start quiz");
        navigate("/dashboard");
        return;
      }

      setQuestions(attempt.questions || []);
      setAllData(attempt);
      sessionStorage.setItem("id", attempt._id);
      
      // Update session storage for timer if remainingTime is provided
      if (attempt.remainingTime) {
         sessionStorage.setItem("quizRemainingSeconds", attempt.remainingTime.toString());
         // Note: useTimer might need a mechanism to sync this if it's already running, 
         // but since this runs on mount/early, it might be race-condition prone with the hook.
         // Ideally passing initial time to hook would be better.
      }

      // Initialize answers and visited status
      const initialAnswers: { [key: number]: string[] } = {};
      const initialVisited = new Set<number>();

      attempt.questions.forEach((q: any, index: number) => {
        if (q.answer && q.answer.length > 0) {
          initialAnswers[index] = q.answer;
        }
        if (q.visited) {
          initialVisited.add(index);
        }
      });
      setAnswers(initialAnswers);
      setVisited(initialVisited);

    } catch (error: any) {
      console.error("Error starting quiz:", error);
      toast.error(error.message || "Error starting quiz");
      if (error.message === "Quiz Expired") { // Adjust based on actual API error
           navigate("/dashboard");
      }
    } finally {
        setIsLoading(false);
    }
  };

  const submitAnswer = async (index: number, answer: string[]) => {
      const questionId = questions[index]?.questionId?._id;
      const attemptId = allData?._id || sessionStorage.getItem("id");
      
      if (!questionId || !attemptId) return;

      const payload = {
        questionId,
        attemptId,
        answer,
        remainingTime: timeLeftRef.current, 
      };

      try {
        await attemptQuestion(payload);
        // toast.success("Answer saved"); // Optional: too noisy?
      } catch (error) {
        console.error("Error saving answer:", error);
        toast.error("Failed to save answer");
      }
  };

  const finalSubmitQuiz = async (autoSubmit = false) => {
    let _attemptedId = allData?._id || sessionStorage.getItem("id");
    if (!_attemptedId) return;

    try {
      await finalSubmit({ attemptId: _attemptedId });
      if (!autoSubmit) {
          toast.success("Test submitted successfully!");
      } else {
          toast.info("Time is up! Test submitted.");
      }
      
      // Clear specific session items but keep what's needed or just clear all
      sessionStorage.removeItem("id"); 
      sessionStorage.removeItem("quizRemainingSeconds");
      
      navigate("/user/test-summary", { state: { attemptId: _attemptedId } });
    } catch (error: any) {
      console.error("Error submitting quiz:", error);
      toast.error(error.message || "Error submitting quiz");
    }
  };

  // ===================== HANDLERS =====================
  const handleNavigation = (index: number) => {
      navigate(`/user/final-test/${params.params}/${index + 1}`);
  };

  const handleNext = () => {
    const currentIndex = parseInt(params.id || "1") - 1;
    if (currentIndex < questions.length - 1) {
      handleNavigation(currentIndex + 1);
    } else {
        // On last question, maybe show a confirm modal or just stay?
        // Requirement says "Final submit button" exists separately.
        // So maybe just nothing or loop? standard is stop.
    }
  };

  const handleBack = () => {
    const currentIndex = parseInt(params.id || "1") - 1;
    if (currentIndex > 0) {
      handleNavigation(currentIndex - 1);
    }
  };

  const handleSelectAnswer = (ans: string) => {
    const currentIndex = parseInt(params.id || "1") - 1;
    const newAnswers = [ans]; // Assuming single choice for now based on UI
    
    setAnswers((prev) => ({
        ...prev,
        [currentIndex]: newAnswers,
    }));
    
    setVisited((prev) => new Set(prev).add(currentIndex));
    
    // Auto-save
    submitAnswer(currentIndex, newAnswers);
  };

  const handleClearAnswer = () => {
      const currentIndex = parseInt(params.id || "1") - 1;
      const currentAns = answers[currentIndex];
      if (!currentAns || currentAns.length === 0) return;

      setAnswers((prev) => {
          const copy = { ...prev };
          delete copy[currentIndex];
          return copy;
      });
      // Submit empty answer to clear on backend? 
      // API expects array.
      submitAnswer(currentIndex, []);
  };

  // ===================== EFFECTS =====================
  useEffect(() => {
    handleStartQuiz();
  }, []);

  // Track visited questions on navigation
  useEffect(() => {
    if (questions.length > 0) {
        const currentIndex = parseInt(params.id || "1") - 1;
        if (!visited.has(currentIndex)) {
             setVisited((prev) => new Set(prev).add(currentIndex));
             // Optionally sync "visited" status to backend if API supports it separate from answer
             // But usually answer submission handles it, or just local tracking is enough for UI.
             // The startQuiz response has 'visited' flag, so ideally we should sync it.
             // But 'submit-answer' is the only update API. 
             // If user visits but doesn't answer, backend might not know unless we send explicit "visited" 
             // or empty answer. For now, assuming local visited is enough for UI.
        }
    }
  }, [params.id, questions.length]);

  // Fullscreen & Protections
  useEffect(() => {
    const onFullScreenChange = () => {
      if (!document.fullscreenElement) {
        toast.warning("You must stay in full screen during the test!");
        goFullScreen();
      }
    };
    document.addEventListener("fullscreenchange", onFullScreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullScreenChange);
  }, []);

  useEffect(() => {
    const disableRightClick = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);
    return () => document.removeEventListener("contextmenu", disableRightClick);
  }, []);

  useEffect(() => {
    const beforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Are you sure you want to leave? Your test is not submitted!";
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, []);

  useQuizProtection(() => finalSubmitQuiz(true));
  useBlockKeys();

  // ===================== RENDER =====================
  if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen bg-primary">
            <div className="text-white">Loading Quiz...</div>
        </div>
      );
  }

  const currentIndex = parseInt(params.id || "1") - 1;
  const currentQuestion = questions[currentIndex];

  return (
    <div>
      <div className="min-h-[100vh] bg-primary flex flex-col p-6 relative">
        {/* Header Section */}
        <header className="bg-secondary text-btn p-4 rounded-lg flex justify-between gap-4 items-center mb-4">
          <div className="flex sm:flex-row flex-col sm:items-center sm:space-x-2 ">
            <h1 className="text-xs sm:text-lg font-semibold">
              {currentQuestion?.questionId?.category || "Quiz"}
            </h1>
            <span className="text-xs sm:text-lg mt-2 sm:mt-0">
              {getToday()}
            </span>
          </div>

          <div className="flex sm:flex-row flex-col sm:items-center sm:space-x-2 ">
            <p className="text-xs sm:text-sm font-semibold sm:font-bold ">
              Remaining Time
            </p>
            <span className={`text-xs sm:text-lg mt-2 sm:mt-0 ${minutes < 5 ? "text-red-600 font-bold" : ""}`}>
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </span>
          </div>

          <div className="flex sm:flex-row flex-col sm:items-center space-x-2 ">
            <div className="bg-green-500 px-3 py-1 rounded-full text-xs text-white">
              Online
            </div>
            <div className="text-xs sm:text-xs w-full mt-1 sm:mt-0">
              {auth?.user?.firstName + " " + auth?.user?.lastName}
            </div>
          </div>
        </header>

        <div className="flex flex-col md:flex-row md:space-x-6">
          {/* Question Section */}
          <section className="bg-white shadow-md p-6 rounded-lg flex-1 h-[60vh] overflow-y-scroll">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Question {currentIndex + 1}</h2>
              <div className="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded">
                {currentQuestion?.questionId?.type}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-lg font-medium text-gray-900 mb-6">
                Q) {currentQuestion?.questionId?.title}
              </p>
              <hr className="my-4" />

              <div className="space-y-3">
                {/* Options */}
                {currentQuestion?.questionId?.options?.map(
                  (option: string, index: number) => (
                    <label
                      key={index}
                      className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                          answers[currentIndex]?.includes(option)
                          ? "bg-blue-50 border-blue-500"
                          : "hover:bg-gray-50 border-gray-200"
                      }`}
                    >
                      <input
                        type="radio" // assuming single choice per requirement implied by UI (can be checkbox if needed)
                        name={`answer-${currentIndex}`}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        value={option}
                        checked={answers[currentIndex]?.includes(option) || false}
                        onChange={(e) => handleSelectAnswer(e.target.value)}
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  )
                )}
              </div>
            </div>
          </section>

          {/* Sidebar */}
          <aside
            className={`bg-white ${
              !showSide ? "absolute right-0 -top-20 ml-4 border" : "hidden"
            } sm:block p-4 rounded-lg shadow-md w-full md:w-1/3 mt-6 md:mt-0 sm:overflow-y-auto sm:h-[60vh]`}
          >
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-700">Question Palette</h3>
                 {/* Mobile toggle logic if needed */}
             </div>

            {/* Status Key */}
            <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Answered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-600">Visited</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
                <span className="text-gray-600">Not Visited</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Current</span>
              </div>
            </div>

            {/* Navigator */}
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: questions.length }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handleNavigation(i)}
                  className={`h-9 w-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors
                    ${
                      i === currentIndex
                        ? "bg-blue-600 text-white ring-2 ring-blue-300 ring-offset-1"
                        : answers[i] && answers[i].length > 0
                        ? "bg-green-500 text-white"
                        : visited.has(i)
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </aside>
        </div>

        {/* Bottom Action Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button
            variant="secondary"
            disabled={currentIndex === 0}
            onClick={handleBack}
            className="w-24"
          >
            Previous
          </Button>

          <Button
            variant="destructive"
            onClick={handleClearAnswer}
            disabled={!answers[currentIndex] || answers[currentIndex].length === 0}
            className="w-24"
          >
            Clear
          </Button>

          {currentIndex < questions.length - 1 ? (
             <Button
                onClick={handleNext}
                className="w-24"
             >
                Next
             </Button>
          ) : (
              <div className="w-24"></div> // Spacer to keep layout if needed
          )}

          <Button
            onClick={() => finalSubmitQuiz(false)}
            className="bg-green-600 hover:bg-green-700 text-white ml-auto"
          >
            Final Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinalTestPage;
