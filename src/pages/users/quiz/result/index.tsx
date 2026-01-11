import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getResult } from "../../apiCall";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const TestSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const fetchResult = async () => {
      const attemptId = location.state?.attemptId;
      if (!attemptId) {
        toast.error("No attempt ID found. Redirecting to dashboard.");
        navigate("/dashboard");
        return;
      }

      try {
        const response = await getResult({ attemptId });
        setResult(response?.data?.summary);
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch results");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [location.state, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No Result Found</h2>
        <Button onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-primary px-6 py-4">
          <h1 className="text-2xl font-bold text-white text-center">Quiz Result</h1>
        </div>
        
        <div className="p-8">
          <div className="text-center mb-10">
            <p className="text-lg text-gray-600 mb-2">You have successfully completed the quiz!</p>
            <div className="text-5xl font-bold text-primary mb-2">{result.percentage}%</div>
            <p className="text-sm text-gray-500">Overall Score</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{result.totalQuestions}</div>
              <div className="text-sm font-medium text-gray-600">Total Questions</div>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-1">{result.attempted}</div>
              <div className="text-sm font-medium text-gray-600">Attempted</div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{result.correct}</div>
              <div className="text-sm font-medium text-gray-600">Correct Answers</div>
            </div>
            <div className="bg-red-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-red-600 mb-1">{result.wrong}</div>
              <div className="text-sm font-medium text-gray-600">Wrong Answers</div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Button 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-2"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </Button>
            <Button 
              variant="outline"
              className="px-8 py-2"
              onClick={() => navigate("/user/all-tests")}
            >
              Take Another Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSummary;
